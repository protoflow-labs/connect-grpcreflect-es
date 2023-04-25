import { ConnectRouter } from "@bufbuild/connect";
import { ElizaService } from "../gen/eliza_connect";
import { withReflection } from "./reflection";
import { readFileSync } from "fs";

export default (router: ConnectRouter) =>
  // registers buf.connect.demo.eliza.v1.ElizaService
  withReflection(router
    .service(ElizaService, {
    say(req) {
      return {
        sentence: `You said: ${req.sentence}`
      }
    },
  }), readFileSync("./gen/image.bin"));

