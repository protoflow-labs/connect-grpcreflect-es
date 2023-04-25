import * as http2 from "http2";
import routes from "./connect";
import { connectNodeAdapter } from "@bufbuild/connect-node";

http2.createServer(
    connectNodeAdapter({ routes }) // responds with 404 for other requests
).listen(8080);