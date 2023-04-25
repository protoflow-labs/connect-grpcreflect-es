"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eliza_connect_1 = require("../gen/eliza_connect");
const reflection_1 = require("./reflection");
const fs_1 = require("fs");
exports.default = (router) => 
// registers buf.connect.demo.eliza.v1.ElizaService
(0, reflection_1.withReflection)(router
    .service(eliza_connect_1.ElizaService, {
    say(req) {
        return {
            sentence: `You said: ${req.sentence}`
        };
    },
}), (0, fs_1.readFileSync)("./gen/image.bin"));
//# sourceMappingURL=connect.js.map