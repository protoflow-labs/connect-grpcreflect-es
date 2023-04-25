import { ConnectRouter } from "@bufbuild/connect";
import { FileDescriptorProto, FileDescriptorSet } from "@bufbuild/protobuf";
export declare const withReflection: (router: ConnectRouter, fileDescriptorData: FileDescriptorProto[] | FileDescriptorSet | Uint8Array) => void;
