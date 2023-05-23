import { ConnectRouter } from '@bufbuild/connect';
import { FileDescriptorProto, FileDescriptorSet } from '@bufbuild/protobuf';
/**
 * Given a FileDescriptor for your protos, generates new routes to offer reflection.
 */
export declare const withReflection: (fileDescriptorData: FileDescriptorProto[] | FileDescriptorSet | Uint8Array, router: ConnectRouter) => void;
