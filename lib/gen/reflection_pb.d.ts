import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
/**
 * The message sent by the client when calling ServerReflectionInfo method.
 *
 * @generated from message grpc.reflection.v1.ServerReflectionRequest
 */
export declare class ServerReflectionRequest extends Message<ServerReflectionRequest> {
    /**
     * @generated from field: string host = 1;
     */
    host: string;
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
    } | {
        case: undefined;
        value?: undefined;
    };
    constructor(data?: PartialMessage<ServerReflectionRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "grpc.reflection.v1.ServerReflectionRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ServerReflectionRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ServerReflectionRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ServerReflectionRequest;
    static equals(a: ServerReflectionRequest | PlainMessage<ServerReflectionRequest> | undefined, b: ServerReflectionRequest | PlainMessage<ServerReflectionRequest> | undefined): boolean;
}
/**
 * The type name and extension number sent by the client when requesting
 * file_containing_extension.
 *
 * @generated from message grpc.reflection.v1.ExtensionRequest
 */
export declare class ExtensionRequest extends Message<ExtensionRequest> {
    /**
     * Fully-qualified type name. The format should be <package>.<type>
     *
     * @generated from field: string containing_type = 1;
     */
    containingType: string;
    /**
     * @generated from field: int32 extension_number = 2;
     */
    extensionNumber: number;
    constructor(data?: PartialMessage<ExtensionRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "grpc.reflection.v1.ExtensionRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ExtensionRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ExtensionRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ExtensionRequest;
    static equals(a: ExtensionRequest | PlainMessage<ExtensionRequest> | undefined, b: ExtensionRequest | PlainMessage<ExtensionRequest> | undefined): boolean;
}
/**
 * The message sent by the server to answer ServerReflectionInfo method.
 *
 * @generated from message grpc.reflection.v1.ServerReflectionResponse
 */
export declare class ServerReflectionResponse extends Message<ServerReflectionResponse> {
    /**
     * @generated from field: string valid_host = 1;
     */
    validHost: string;
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
    } | {
        case: undefined;
        value?: undefined;
    };
    constructor(data?: PartialMessage<ServerReflectionResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "grpc.reflection.v1.ServerReflectionResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ServerReflectionResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ServerReflectionResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ServerReflectionResponse;
    static equals(a: ServerReflectionResponse | PlainMessage<ServerReflectionResponse> | undefined, b: ServerReflectionResponse | PlainMessage<ServerReflectionResponse> | undefined): boolean;
}
/**
 * Serialized FileDescriptorProto messages sent by the server answering
 * a file_by_filename, file_containing_symbol, or file_containing_extension
 * request.
 *
 * @generated from message grpc.reflection.v1.FileDescriptorResponse
 */
export declare class FileDescriptorResponse extends Message<FileDescriptorResponse> {
    /**
     * Serialized FileDescriptorProto messages. We avoid taking a dependency on
     * descriptor.proto, which uses proto2 only features, by making them opaque
     * bytes instead.
     *
     * @generated from field: repeated bytes file_descriptor_proto = 1;
     */
    fileDescriptorProto: Uint8Array[];
    constructor(data?: PartialMessage<FileDescriptorResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "grpc.reflection.v1.FileDescriptorResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FileDescriptorResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FileDescriptorResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FileDescriptorResponse;
    static equals(a: FileDescriptorResponse | PlainMessage<FileDescriptorResponse> | undefined, b: FileDescriptorResponse | PlainMessage<FileDescriptorResponse> | undefined): boolean;
}
/**
 * A list of extension numbers sent by the server answering
 * all_extension_numbers_of_type request.
 *
 * @generated from message grpc.reflection.v1.ExtensionNumberResponse
 */
export declare class ExtensionNumberResponse extends Message<ExtensionNumberResponse> {
    /**
     * Full name of the base type, including the package name. The format
     * is <package>.<type>
     *
     * @generated from field: string base_type_name = 1;
     */
    baseTypeName: string;
    /**
     * @generated from field: repeated int32 extension_number = 2;
     */
    extensionNumber: number[];
    constructor(data?: PartialMessage<ExtensionNumberResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "grpc.reflection.v1.ExtensionNumberResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ExtensionNumberResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ExtensionNumberResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ExtensionNumberResponse;
    static equals(a: ExtensionNumberResponse | PlainMessage<ExtensionNumberResponse> | undefined, b: ExtensionNumberResponse | PlainMessage<ExtensionNumberResponse> | undefined): boolean;
}
/**
 * A list of ServiceResponse sent by the server answering list_services request.
 *
 * @generated from message grpc.reflection.v1.ListServiceResponse
 */
export declare class ListServiceResponse extends Message<ListServiceResponse> {
    /**
     * The information of each service may be expanded in the future, so we use
     * ServiceResponse message to encapsulate it.
     *
     * @generated from field: repeated grpc.reflection.v1.ServiceResponse service = 1;
     */
    service: ServiceResponse[];
    constructor(data?: PartialMessage<ListServiceResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "grpc.reflection.v1.ListServiceResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListServiceResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListServiceResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListServiceResponse;
    static equals(a: ListServiceResponse | PlainMessage<ListServiceResponse> | undefined, b: ListServiceResponse | PlainMessage<ListServiceResponse> | undefined): boolean;
}
/**
 * The information of a single service used by ListServiceResponse to answer
 * list_services request.
 *
 * @generated from message grpc.reflection.v1.ServiceResponse
 */
export declare class ServiceResponse extends Message<ServiceResponse> {
    /**
     * Full name of a registered service, including its package name. The format
     * is <package>.<service>
     *
     * @generated from field: string name = 1;
     */
    name: string;
    constructor(data?: PartialMessage<ServiceResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "grpc.reflection.v1.ServiceResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ServiceResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ServiceResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ServiceResponse;
    static equals(a: ServiceResponse | PlainMessage<ServiceResponse> | undefined, b: ServiceResponse | PlainMessage<ServiceResponse> | undefined): boolean;
}
/**
 * The error code and error message sent by the server when an error occurs.
 *
 * @generated from message grpc.reflection.v1.ErrorResponse
 */
export declare class ErrorResponse extends Message<ErrorResponse> {
    /**
     * This field uses the error codes defined in grpc::StatusCode.
     *
     * @generated from field: int32 error_code = 1;
     */
    errorCode: number;
    /**
     * @generated from field: string error_message = 2;
     */
    errorMessage: string;
    constructor(data?: PartialMessage<ErrorResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "grpc.reflection.v1.ErrorResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ErrorResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ErrorResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ErrorResponse;
    static equals(a: ErrorResponse | PlainMessage<ErrorResponse> | undefined, b: ErrorResponse | PlainMessage<ErrorResponse> | undefined): boolean;
}
