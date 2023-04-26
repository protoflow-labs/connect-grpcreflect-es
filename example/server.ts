import * as http2 from "http2";
import { connectNodeAdapter } from "@bufbuild/connect-node";
import { withReflection } from "../src/reflection";
import { readFileSync } from "fs";
import { ElizaService } from "../gen/eliza_connect";
import { ConnectRouter } from "@bufbuild/connect";

const routes = (router: ConnectRouter) => withReflection(
  readFileSync("./gen/image.bin"),
  router.service(ElizaService, {
    say(req) {
      return {
        sentence: `You said: ${req.sentence}`
      }
    }
  })
);

http2.createServer(
    connectNodeAdapter({ routes }) // responds with 404 for other requests
).listen(8080);