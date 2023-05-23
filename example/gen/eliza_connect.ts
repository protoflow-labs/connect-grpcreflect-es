// @generated by protoc-gen-connect-es v0.9.0 with parameter "target=ts,import_extension=none"
// @generated from file eliza.proto (package buf.connect.demo.eliza.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { SayRequest, SayResponse } from "./eliza_pb";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service buf.connect.demo.eliza.v1.ElizaService
 */
export const ElizaService = {
  typeName: "buf.connect.demo.eliza.v1.ElizaService",
  methods: {
    /**
     * @generated from rpc buf.connect.demo.eliza.v1.ElizaService.Say
     */
    say: {
      name: "Say",
      I: SayRequest,
      O: SayResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

