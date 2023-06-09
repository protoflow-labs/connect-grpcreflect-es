// Copyright 2016 The gRPC Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Service exported by server reflection.  A more complete description of how
// server reflection works can be found at
// https://github.com/grpc/grpc/blob/master/doc/server-reflection.md
//
// The canonical version of this proto can be found at
// https://github.com/grpc/grpc-proto/blob/master/grpc/reflection/v1/reflection.proto

// @generated by protoc-gen-es v1.2.0 with parameter "target=ts"
// @generated from file reflection.proto (package grpc.reflection.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * The message sent by the client when calling ServerReflectionInfo method.
 *
 * @generated from message grpc.reflection.v1.ServerReflectionRequest
 */
export class ServerReflectionRequest extends Message<ServerReflectionRequest> {
  /**
   * @generated from field: string host = 1;
   */
  host = "";

  /**
   * To use reflection service, the client should set one of the following
   * fields in message_request. The server distinguishes requests by their
   * defined field and then handles them using corresponding methods.
   *
   * @generated from oneof grpc.reflection.v1.ServerReflectionRequest.message_request
   */
  messageRequest: {
    /**
     * Find a proto file by the file name.
     *
     * @generated from field: string file_by_filename = 3;
     */
    value: string;
    case: "fileByFilename";
  } | {
    /**
     * Find the proto file that declares the given fully-qualified symbol name.
     * This field should be a fully-qualified symbol name
     * (e.g. <package>.<service>[.<method>] or <package>.<type>).
     *
     * @generated from field: string file_containing_symbol = 4;
     */
    value: string;
    case: "fileContainingSymbol";
  } | {
    /**
     * Find the proto file which defines an extension extending the given
     * message type with the given field number.
     *
     * @generated from field: grpc.reflection.v1.ExtensionRequest file_containing_extension = 5;
     */
    value: ExtensionRequest;
    case: "fileContainingExtension";
  } | {
    /**
     * Finds the tag numbers used by all known extensions of the given message
     * type, and appends them to ExtensionNumberResponse in an undefined order.
     * Its corresponding method is best-effort: it's not guaranteed that the
     * reflection service will implement this method, and it's not guaranteed
     * that this method will provide all extensions. Returns
     * StatusCode::UNIMPLEMENTED if it's not implemented.
     * This field should be a fully-qualified type name. The format is
     * <package>.<type>
     *
     * @generated from field: string all_extension_numbers_of_type = 6;
     */
    value: string;
    case: "allExtensionNumbersOfType";
  } | {
    /**
     * List the full names of registered services. The content will not be
     * checked.
     *
     * @generated from field: string list_services = 7;
     */
    value: string;
    case: "listServices";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<ServerReflectionRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "grpc.reflection.v1.ServerReflectionRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "host", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "file_by_filename", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "message_request" },
    { no: 4, name: "file_containing_symbol", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "message_request" },
    { no: 5, name: "file_containing_extension", kind: "message", T: ExtensionRequest, oneof: "message_request" },
    { no: 6, name: "all_extension_numbers_of_type", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "message_request" },
    { no: 7, name: "list_services", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "message_request" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ServerReflectionRequest {
    return new ServerReflectionRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ServerReflectionRequest {
    return new ServerReflectionRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ServerReflectionRequest {
    return new ServerReflectionRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ServerReflectionRequest | PlainMessage<ServerReflectionRequest> | undefined, b: ServerReflectionRequest | PlainMessage<ServerReflectionRequest> | undefined): boolean {
    return proto3.util.equals(ServerReflectionRequest, a, b);
  }
}

/**
 * The type name and extension number sent by the client when requesting
 * file_containing_extension.
 *
 * @generated from message grpc.reflection.v1.ExtensionRequest
 */
export class ExtensionRequest extends Message<ExtensionRequest> {
  /**
   * Fully-qualified type name. The format should be <package>.<type>
   *
   * @generated from field: string containing_type = 1;
   */
  containingType = "";

  /**
   * @generated from field: int32 extension_number = 2;
   */
  extensionNumber = 0;

  constructor(data?: PartialMessage<ExtensionRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "grpc.reflection.v1.ExtensionRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "containing_type", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "extension_number", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ExtensionRequest {
    return new ExtensionRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ExtensionRequest {
    return new ExtensionRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ExtensionRequest {
    return new ExtensionRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ExtensionRequest | PlainMessage<ExtensionRequest> | undefined, b: ExtensionRequest | PlainMessage<ExtensionRequest> | undefined): boolean {
    return proto3.util.equals(ExtensionRequest, a, b);
  }
}

/**
 * The message sent by the server to answer ServerReflectionInfo method.
 *
 * @generated from message grpc.reflection.v1.ServerReflectionResponse
 */
export class ServerReflectionResponse extends Message<ServerReflectionResponse> {
  /**
   * @generated from field: string valid_host = 1;
   */
  validHost = "";

  /**
   * @generated from field: grpc.reflection.v1.ServerReflectionRequest original_request = 2;
   */
  originalRequest?: ServerReflectionRequest;

  /**
   * The server sets one of the following fields according to the message_request
   * in the request.
   *
   * @generated from oneof grpc.reflection.v1.ServerReflectionResponse.message_response
   */
  messageResponse: {
    /**
     * This message is used to answer file_by_filename, file_containing_symbol,
     * file_containing_extension requests with transitive dependencies.
     * As the repeated label is not allowed in oneof fields, we use a
     * FileDescriptorResponse message to encapsulate the repeated fields.
     * The reflection service is allowed to avoid sending FileDescriptorProtos
     * that were previously sent in response to earlier requests in the stream.
     *
     * @generated from field: grpc.reflection.v1.FileDescriptorResponse file_descriptor_response = 4;
     */
    value: FileDescriptorResponse;
    case: "fileDescriptorResponse";
  } | {
    /**
     * This message is used to answer all_extension_numbers_of_type requests.
     *
     * @generated from field: grpc.reflection.v1.ExtensionNumberResponse all_extension_numbers_response = 5;
     */
    value: ExtensionNumberResponse;
    case: "allExtensionNumbersResponse";
  } | {
    /**
     * This message is used to answer list_services requests.
     *
     * @generated from field: grpc.reflection.v1.ListServiceResponse list_services_response = 6;
     */
    value: ListServiceResponse;
    case: "listServicesResponse";
  } | {
    /**
     * This message is used when an error occurs.
     *
     * @generated from field: grpc.reflection.v1.ErrorResponse error_response = 7;
     */
    value: ErrorResponse;
    case: "errorResponse";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<ServerReflectionResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "grpc.reflection.v1.ServerReflectionResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "valid_host", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "original_request", kind: "message", T: ServerReflectionRequest },
    { no: 4, name: "file_descriptor_response", kind: "message", T: FileDescriptorResponse, oneof: "message_response" },
    { no: 5, name: "all_extension_numbers_response", kind: "message", T: ExtensionNumberResponse, oneof: "message_response" },
    { no: 6, name: "list_services_response", kind: "message", T: ListServiceResponse, oneof: "message_response" },
    { no: 7, name: "error_response", kind: "message", T: ErrorResponse, oneof: "message_response" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ServerReflectionResponse {
    return new ServerReflectionResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ServerReflectionResponse {
    return new ServerReflectionResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ServerReflectionResponse {
    return new ServerReflectionResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ServerReflectionResponse | PlainMessage<ServerReflectionResponse> | undefined, b: ServerReflectionResponse | PlainMessage<ServerReflectionResponse> | undefined): boolean {
    return proto3.util.equals(ServerReflectionResponse, a, b);
  }
}

/**
 * Serialized FileDescriptorProto messages sent by the server answering
 * a file_by_filename, file_containing_symbol, or file_containing_extension
 * request.
 *
 * @generated from message grpc.reflection.v1.FileDescriptorResponse
 */
export class FileDescriptorResponse extends Message<FileDescriptorResponse> {
  /**
   * Serialized FileDescriptorProto messages. We avoid taking a dependency on
   * descriptor.proto, which uses proto2 only features, by making them opaque
   * bytes instead.
   *
   * @generated from field: repeated bytes file_descriptor_proto = 1;
   */
  fileDescriptorProto: Uint8Array[] = [];

  constructor(data?: PartialMessage<FileDescriptorResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "grpc.reflection.v1.FileDescriptorResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "file_descriptor_proto", kind: "scalar", T: 12 /* ScalarType.BYTES */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FileDescriptorResponse {
    return new FileDescriptorResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FileDescriptorResponse {
    return new FileDescriptorResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FileDescriptorResponse {
    return new FileDescriptorResponse().fromJsonString(jsonString, options);
  }

  static equals(a: FileDescriptorResponse | PlainMessage<FileDescriptorResponse> | undefined, b: FileDescriptorResponse | PlainMessage<FileDescriptorResponse> | undefined): boolean {
    return proto3.util.equals(FileDescriptorResponse, a, b);
  }
}

/**
 * A list of extension numbers sent by the server answering
 * all_extension_numbers_of_type request.
 *
 * @generated from message grpc.reflection.v1.ExtensionNumberResponse
 */
export class ExtensionNumberResponse extends Message<ExtensionNumberResponse> {
  /**
   * Full name of the base type, including the package name. The format
   * is <package>.<type>
   *
   * @generated from field: string base_type_name = 1;
   */
  baseTypeName = "";

  /**
   * @generated from field: repeated int32 extension_number = 2;
   */
  extensionNumber: number[] = [];

  constructor(data?: PartialMessage<ExtensionNumberResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "grpc.reflection.v1.ExtensionNumberResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "base_type_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "extension_number", kind: "scalar", T: 5 /* ScalarType.INT32 */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ExtensionNumberResponse {
    return new ExtensionNumberResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ExtensionNumberResponse {
    return new ExtensionNumberResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ExtensionNumberResponse {
    return new ExtensionNumberResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ExtensionNumberResponse | PlainMessage<ExtensionNumberResponse> | undefined, b: ExtensionNumberResponse | PlainMessage<ExtensionNumberResponse> | undefined): boolean {
    return proto3.util.equals(ExtensionNumberResponse, a, b);
  }
}

/**
 * A list of ServiceResponse sent by the server answering list_services request.
 *
 * @generated from message grpc.reflection.v1.ListServiceResponse
 */
export class ListServiceResponse extends Message<ListServiceResponse> {
  /**
   * The information of each service may be expanded in the future, so we use
   * ServiceResponse message to encapsulate it.
   *
   * @generated from field: repeated grpc.reflection.v1.ServiceResponse service = 1;
   */
  service: ServiceResponse[] = [];

  constructor(data?: PartialMessage<ListServiceResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "grpc.reflection.v1.ListServiceResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "service", kind: "message", T: ServiceResponse, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListServiceResponse {
    return new ListServiceResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListServiceResponse {
    return new ListServiceResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListServiceResponse {
    return new ListServiceResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListServiceResponse | PlainMessage<ListServiceResponse> | undefined, b: ListServiceResponse | PlainMessage<ListServiceResponse> | undefined): boolean {
    return proto3.util.equals(ListServiceResponse, a, b);
  }
}

/**
 * The information of a single service used by ListServiceResponse to answer
 * list_services request.
 *
 * @generated from message grpc.reflection.v1.ServiceResponse
 */
export class ServiceResponse extends Message<ServiceResponse> {
  /**
   * Full name of a registered service, including its package name. The format
   * is <package>.<service>
   *
   * @generated from field: string name = 1;
   */
  name = "";

  constructor(data?: PartialMessage<ServiceResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "grpc.reflection.v1.ServiceResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ServiceResponse {
    return new ServiceResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ServiceResponse {
    return new ServiceResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ServiceResponse {
    return new ServiceResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ServiceResponse | PlainMessage<ServiceResponse> | undefined, b: ServiceResponse | PlainMessage<ServiceResponse> | undefined): boolean {
    return proto3.util.equals(ServiceResponse, a, b);
  }
}

/**
 * The error code and error message sent by the server when an error occurs.
 *
 * @generated from message grpc.reflection.v1.ErrorResponse
 */
export class ErrorResponse extends Message<ErrorResponse> {
  /**
   * This field uses the error codes defined in grpc::StatusCode.
   *
   * @generated from field: int32 error_code = 1;
   */
  errorCode = 0;

  /**
   * @generated from field: string error_message = 2;
   */
  errorMessage = "";

  constructor(data?: PartialMessage<ErrorResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "grpc.reflection.v1.ErrorResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "error_code", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "error_message", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ErrorResponse {
    return new ErrorResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ErrorResponse {
    return new ErrorResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ErrorResponse {
    return new ErrorResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ErrorResponse | PlainMessage<ErrorResponse> | undefined, b: ErrorResponse | PlainMessage<ErrorResponse> | undefined): boolean {
    return proto3.util.equals(ErrorResponse, a, b);
  }
}

