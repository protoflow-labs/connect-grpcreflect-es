"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerReflection = void 0;
// Service exported by server reflection.  A more complete description of how
// server reflection works can be found at
// https://github.com/grpc/grpc/blob/master/doc/server-reflection.md
//
// The canonical version of this proto can be found at
// https://github.com/grpc/grpc-proto/blob/master/grpc/reflection/v1/reflection.proto
// @generated by protoc-gen-connect-es v0.9.0 with parameter "target=ts"
// @generated from file reflection.proto (package grpc.reflection.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck
const reflection_pb_js_1 = require("./reflection_pb.js");
const protobuf_1 = require("@bufbuild/protobuf");
/**
 * @generated from service grpc.reflection.v1.ServerReflection
 */
exports.ServerReflection = {
    typeName: "grpc.reflection.v1.ServerReflection",
    methods: {
        /**
         * The reflection service is structured as a bidirectional stream, ensuring
         * all related requests go to a single server.
         *
         * @generated from rpc grpc.reflection.v1.ServerReflection.ServerReflectionInfo
         */
        serverReflectionInfo: {
            name: "ServerReflectionInfo",
            I: reflection_pb_js_1.ServerReflectionRequest,
            O: reflection_pb_js_1.ServerReflectionResponse,
            kind: protobuf_1.MethodKind.BiDiStreaming,
        },
    }
};
//# sourceMappingURL=reflection_connect.js.map