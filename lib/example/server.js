"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http2 = require("http2");
const connect_node_1 = require("@bufbuild/connect-node");
const reflection_1 = require("../src/reflection");
const fs_1 = require("fs");
const eliza_connect_1 = require("../gen/eliza_connect");
const routes = (router) => (0, reflection_1.withReflection)((0, fs_1.readFileSync)("./gen/image.bin"), router.service(eliza_connect_1.ElizaService, {
    say(req) {
        return {
            sentence: `You said: ${req.sentence}`
        };
    }
}));
http2.createServer((0, connect_node_1.connectNodeAdapter)({ routes }) // responds with 404 for other requests
).listen(8080);
//# sourceMappingURL=server.js.map