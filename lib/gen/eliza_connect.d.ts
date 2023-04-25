import { SayRequest, SayResponse } from "./eliza_pb.js";
import { MethodKind } from "@bufbuild/protobuf";
/**
 * @generated from service buf.connect.demo.eliza.v1.ElizaService
 */
export declare const ElizaService: {
    readonly typeName: "buf.connect.demo.eliza.v1.ElizaService";
    readonly methods: {
        /**
         * @generated from rpc buf.connect.demo.eliza.v1.ElizaService.Say
         */
        readonly say: {
            readonly name: "Say";
            readonly I: typeof SayRequest;
            readonly O: typeof SayResponse;
            readonly kind: MethodKind.Unary;
        };
    };
};
