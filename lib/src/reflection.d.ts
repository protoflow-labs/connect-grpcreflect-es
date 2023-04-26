import { ConnectRouter } from "@bufbuild/connect";
import { FileDescriptorProto, FileDescriptorSet } from "@bufbuild/protobuf";
export declare const withReflection: (fileDescriptorData: FileDescriptorProto[] | FileDescriptorSet | Uint8Array, router: ConnectRouter) => void;
