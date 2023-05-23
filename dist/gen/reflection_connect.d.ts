import { ServerReflectionRequest, ServerReflectionResponse } from "./reflection_pb.js";
import { MethodKind } from "@bufbuild/protobuf";
/**
 * @generated from service grpc.reflection.v1.ServerReflection
 */
export declare const ServerReflection: {
    readonly typeName: "grpc.reflection.v1.ServerReflection";
    readonly methods: {
        /**
         * The reflection service is structured as a bidirectional stream, ensuring
         * all related requests go to a single server.
         *
         * @generated from rpc grpc.reflection.v1.ServerReflection.ServerReflectionInfo
         */
        readonly serverReflectionInfo: {
            readonly name: "ServerReflectionInfo";
            readonly I: typeof ServerReflectionRequest;
            readonly O: typeof ServerReflectionResponse;
            readonly kind: MethodKind.BiDiStreaming;
        };
    };
};
