import { Code, ConnectRouter } from "@bufbuild/connect";
import { ServerReflection } from "../gen/reflection_connect";
import { ErrorResponse, FileDescriptorResponse, ListServiceResponse, ServerReflectionRequest, ServerReflectionResponse, ServiceResponse } from "../gen/reflection_pb";
import { DescEnum, DescExtension, DescFile, DescMessage, DescService, DescriptorSet, FileDescriptorProto, FileDescriptorSet, createDescriptorSet, createRegistry } from "@bufbuild/protobuf";

export const withReflection = (fileDescriptorData: FileDescriptorProto[] | FileDescriptorSet | Uint8Array, router: ConnectRouter) => {
	const ds = createDescriptorSet(fileDescriptorData);

	router.service(ServerReflection, {
		serverReflectionInfo: reflectionHandler(ds),
	});

	// Some tools haven't been updated to use the v1 release of server reflection so we need
	// to support alpha as well (luckily the schemas are the same)
	router.service({
		...ServerReflection,
		typeName: "grpc.reflection.v1alpha.ServerReflection",
	}, {
		serverReflectionInfo: reflectionHandler(ds),
	});
};

const reflectionHandler = (ds: DescriptorSet) => async function*(reqs: AsyncIterable<ServerReflectionRequest>) {
	for await (const req of reqs) {
		const response = new ServerReflectionResponse({
			validHost: req.host,
			originalRequest: req
		});

		switch(req.messageRequest.case) {
			case 'fileByFilename': {
				response.messageResponse = findFileByFilename(ds, req.messageRequest.value);
        break;
			}

      case 'fileContainingSymbol': {
				response.messageResponse = findFileContainingSymbol(ds, req.messageRequest.value);
        break;
			}

      case 'listServices': {
				response.messageResponse = listServices(ds)
        break;
			}

      case 'allExtensionNumbersOfType': {
				response.messageResponse = errorResponse('Not currently implemented', Code.Unimplemented)
        break;
			}

      case 'fileContainingExtension': {
				response.messageResponse = errorResponse('Not currently implemented', Code.Unimplemented)
        break;
			}

      default: {
        response.messageResponse = notFoundErrorResponse(req.messageRequest.value || '');
      }
		}
		yield response;
	}
}

type ErrorCase = {
  value: ErrorResponse;
  case: "errorResponse";
}

type FileDescriptorCase = {
  value: FileDescriptorResponse;
  case: "fileDescriptorResponse";
}

type ListServiceResponseCase = {
  value: ListServiceResponse;
  case: "listServicesResponse";
}

const listServices = (ds: DescriptorSet): ListServiceResponseCase => {
  return {
    case: 'listServicesResponse',
    value: new ListServiceResponse({
      service: [...ds.services.keys()].map(serviceName => new ServiceResponse({
        name: serviceName
      }))
    }),
  }
}

const findFileByFilename = (ds: DescriptorSet, filename: string): FileDescriptorCase | ErrorCase => {
  const sanitizedFilename = filename.replace(/\.proto$/, '');
  const file = ds.files.find(f => f.name === sanitizedFilename)
  if (file) {
    return fileDescriptorResponse(file);
  }

  return notFoundErrorResponse(filename);
}

// Rough port of https://github.com/protocolbuffers/protobuf-go/blob/808c66411fe76c839a68168654228446fbdc1ecf/reflect/protoregistry/registry.go#L222
const findFileContainingSymbol = (ds: DescriptorSet, name: string): FileDescriptorCase | ErrorCase => {
  let prefix = name;
  let suffix = '';

  while (prefix != '') {
    const lookup = lookupDescriptor(ds, prefix);
    if (lookup) {
      const { type, descriptor } = lookup;
      if (descriptor.typeName === name) {
        return fileDescriptorResponse(descriptor.file);
      }

      switch (type) {
        case 'message': {
          const response = findDescriptorInMessage(ds, descriptor, suffix);
          if (response) {
            return response;
          }
          break;
        }

        case 'service': {
          const method = descriptor.methods.find(m => m.name === suffix)
          if (method) {
            return fileDescriptorResponse(method.parent.file)
          }
        }
      }
    }

    const parts = prefix.split('.');
    const trailing = parts.pop() || '';
    suffix = suffix ? (suffix + '.' + trailing) : trailing;
    prefix = parts.join('.')
  }

  return notFoundErrorResponse(name)
}

// This recursive function has not really been tested at all, what's the worst that can happen?
const findDescriptorInMessage = (ds: DescriptorSet, message: DescMessage, suffix: string): FileDescriptorCase | undefined => {
  const parts = suffix.split('.');
  const name = parts.pop();
  suffix = parts.join('.');

  if (suffix === '') {
    const enumDesc = message.nestedEnums.find(nested => nested.name === name);
    if (enumDesc) {
      return fileDescriptorResponse(enumDesc.file);
    }

    for (const nestedEnum of message.nestedEnums) {
      const value = nestedEnum.values.find(value => value.name === name);
      if (value) {
        return fileDescriptorResponse(value.parent.file)
      }
    }

    const extension = message.nestedExtensions.find(nested => nested.name === name);
    if (extension) {
      return fileDescriptorResponse(extension.file);
    }

    const field = message.fields.find(nested => nested.name === name);
    if (field) {
      return fileDescriptorResponse(field.parent.file);
    }

    const oneof = message.oneofs.find(nested => nested.name === name);
    if (oneof) {
      return fileDescriptorResponse(oneof.parent.file);
    }
  }

  const nestedMessage = message.nestedMessages.find(nested => nested.name === name);
  if (nestedMessage) {
    if (suffix === '') {
      return fileDescriptorResponse(message.file);
    }

    return findDescriptorInMessage(ds, message, suffix);
  }

  return undefined;
}

type DescriptorLookup = {
  type: 'service';
  descriptor: DescService;
} | {
  type: 'enum';
  descriptor: DescEnum;
} | {
  type: 'message';
  descriptor: DescMessage;
} | {
  type: 'extension';
  descriptor: DescExtension;
} | undefined

const lookupDescriptor = (ds: DescriptorSet, name: string): DescriptorLookup => {
  const service = ds.services.get(name)
  if (service) {
    return {
      type: 'service',
      descriptor: service,
    }
  }

  const descEnum = ds.enums.get(name)
  if (descEnum) {
    return {
      type: 'enum',
      descriptor: descEnum,
    }
  }

  const message = ds.messages.get(name)
  if (message) {
    return {
      type: 'message',
      descriptor: message,
    }
  }

  const extension = ds.extensions.get(name)
  if (extension) {
    return {
      type: 'extension',
      descriptor: extension,
    }
  }
};

const fileDescriptorResponse = (file: DescFile): FileDescriptorCase => ({
    case: 'fileDescriptorResponse',
    value: new FileDescriptorResponse({
      fileDescriptorProto: [file.proto.toBinary()],
    })
  })

const errorResponse = (errorMessage: string, errorCode: number): ErrorCase => ({
  case: 'errorResponse',
  value: new ErrorResponse({
    errorMessage,
    errorCode,
  }),
})

const notFoundErrorResponse = (name: string) => errorResponse(`Could not find: ${name}`, Code.NotFound);
