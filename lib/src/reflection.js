"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withReflection = void 0;
const reflection_connect_1 = require("../gen/reflection_connect");
const reflection_pb_1 = require("../gen/reflection_pb");
const protobuf_1 = require("@bufbuild/protobuf");
const NOT_FOUND_CODE = 5;
const withReflection = (router, fileDescriptorData) => {
    // TODO - Can we derive the fileDescriptorData from the compiled type definitions? (probably not)
    // const services = router.handlers.map(h => h.service);
    // const registry = createRegistry(...services);
    const ds = (0, protobuf_1.createDescriptorSet)(fileDescriptorData);
    router.service(reflection_connect_1.ServerReflection, {
        serverReflectionInfo: reflectionHandler(ds),
    });
    // Some tools haven't been updated to use the v1 release of server reflection so we need
    // to support alpha as well (luckily the schemas are the same)
    router.service(Object.assign(Object.assign({}, reflection_connect_1.ServerReflection), { typeName: "grpc.reflection.v1alpha.ServerReflection" }), {
        serverReflectionInfo: reflectionHandler(ds),
    });
};
exports.withReflection = withReflection;
const reflectionHandler = (ds) => function (reqs) {
    return __asyncGenerator(this, arguments, function* () {
        var _a, e_1, _b, _c;
        try {
            for (var _d = true, reqs_1 = __asyncValues(reqs), reqs_1_1; reqs_1_1 = yield __await(reqs_1.next()), _a = reqs_1_1.done, !_a;) {
                _c = reqs_1_1.value;
                _d = false;
                try {
                    const req = _c;
                    const response = new reflection_pb_1.ServerReflectionResponse({
                        validHost: req.host,
                        originalRequest: req
                    });
                    switch (req.messageRequest.case) {
                        case 'fileContainingSymbol': {
                            response.messageResponse = findDescriptorByName(ds, req.messageRequest.value);
                            break;
                        }
                    }
                    yield yield __await(response);
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = reqs_1.return)) yield __await(_b.call(reqs_1));
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
};
// Rough port of https://github.com/protocolbuffers/protobuf-go/blob/808c66411fe76c839a68168654228446fbdc1ecf/reflect/protoregistry/registry.go#L222
const findDescriptorByName = (ds, name) => {
    let prefix = name;
    let suffix = '';
    while (prefix != '') {
        const lookup = lookupDescriptor(ds, prefix);
        if (lookup) {
            const { type, descriptor } = lookup;
            if (descriptor.typeName === name) {
                return {
                    case: 'fileDescriptorResponse',
                    value: new reflection_pb_1.FileDescriptorResponse({
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
                    const method = descriptor.methods.find(m => m.name === suffix);
                    if (method) {
                        return {
                            case: 'fileDescriptorResponse',
                            value: new reflection_pb_1.FileDescriptorResponse({
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
        prefix = parts.join('.');
    }
    return notFoundError(name);
};
const lookupDescriptor = (ds, name) => {
    const service = ds.services.get(name);
    if (service) {
        return {
            type: 'service',
            descriptor: service,
        };
    }
    const descEnum = ds.enums.get(name);
    if (descEnum) {
        return {
            type: 'enum',
            descriptor: descEnum,
        };
    }
    const message = ds.messages.get(name);
    if (message) {
        return {
            type: 'message',
            descriptor: message,
        };
    }
    const extension = ds.extensions.get(name);
    if (extension) {
        return {
            type: 'extension',
            descriptor: extension,
        };
    }
};
const notFoundError = (name) => ({
    case: 'errorResponse',
    value: new reflection_pb_1.ErrorResponse({
        errorMessage: `Could not find: ${name}`,
        errorCode: NOT_FOUND_CODE
    }),
});
//# sourceMappingURL=reflection.js.map