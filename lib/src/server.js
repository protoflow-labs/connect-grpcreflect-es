"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http2 = require("http2");
const connect_1 = require("./connect");
const connect_node_1 = require("@bufbuild/connect-node");
http2.createServer((0, connect_node_1.connectNodeAdapter)({ routes: connect_1.default }) // responds with 404 for other requests
).listen(8080);
//# sourceMappingURL=server.js.map