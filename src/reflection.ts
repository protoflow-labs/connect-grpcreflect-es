import { ConnectRouter } from "@bufbuild/connect";
import { ServerReflection } from "../gen/reflection_connect";
import { ErrorResponse, FileDescriptorResponse, ServerReflectionRequest, ServerReflectionResponse } from "../gen/reflection_pb";
import { DescEnum, DescExtension, DescMessage, DescService, DescriptorSet, FileDescriptorProto, FileDescriptorSet, createDescriptorSet, createRegistry } from "@bufbuild/protobuf";

const NOT_FOUND_CODE = 5;

export const withReflection = (router: ConnectRouter, fileDescriptorData: FileDescriptorProto[] | FileDescriptorSet | Uint8Array) => {
	// TODO - Can we derive the fileDescriptorData from the compiled type definitions? (probably not)
	// const services = router.handlers.map(h => h.service);
	// const registry = createRegistry(...services);
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
			case 'fileContainingSymbol': {
				response.messageResponse = findDescriptorByName(ds, req.messageRequest.value);
        break;
			}
		}
		yield response;
	}
}

type ErrorCase = {
  value: ErrorResponse;
  case: "errorResponse";
}

type FileContainingSymbolResponse = {
  value: FileDescriptorResponse;
  case: "fileDescriptorResponse";
} | ErrorCase

// Rough port of https://github.com/protocolbuffers/protobuf-go/blob/808c66411fe76c839a68168654228446fbdc1ecf/reflect/protoregistry/registry.go#L222
const findDescriptorByName = (ds: DescriptorSet, name: string): FileContainingSymbolResponse => {
  let prefix = name;
  let suffix = '';

  while (prefix != '') {
    const lookup = lookupDescriptor(ds, prefix);
    if (lookup) {
      const { type, descriptor } = lookup;
      if (descriptor.typeName === name) {
        return {
          case: 'fileDescriptorResponse',
          value: new FileDescriptorResponse({
            fileDescriptorProto: [descriptor.file.proto.toBinary()],
          })
        };
      }

      switch (type) {
        case 'message': {
          // Handle potential sub message match
          break;
        }

        case 'service': {
          const method = descriptor.methods.find(m => m.name === suffix)
          if (method) {
            return {
              case: 'fileDescriptorResponse',
              value: new FileDescriptorResponse({
                fileDescriptorProto: [method.parent.file.proto.toBinary()],
              })
            };
          }
        }
      }
    }

    const parts = prefix.split('.');
    const trailing = parts.pop() || '';
    suffix = suffix ? (suffix + '.' + trailing) : trailing;
    prefix = parts.join('.')
  }

  return notFoundError(name)
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

const notFoundError = (name: string): ErrorCase => ({
  case: 'errorResponse',
  value: new ErrorResponse({
    errorMessage: `Could not find: ${name}`,
    errorCode: NOT_FOUND_CODE
  }),
});
