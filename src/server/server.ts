import { dev } from "./dotEnv";
import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { dbConfig } from "../db/dbconfig";
import { WebSocketServer } from "ws";
import { setWsServer } from "../app/graphql/ws/yogaWsServer";
// import { wsHandler } from "../app/graphql/ws/yogaWsServer";
import mongoose from "mongoose";

/**
 * Loads environment variables from various .env files.
 * This ensures that environment variables are available throughout the application.
 */
// const dotEnvOutput = configEnv({
//   path: [
//     ".env",
//     ".env.local",
//     dev ? ".env.development" : ".env.production",
//     dev ? ".env.development.local" : ".env.production.local",
//   ],
// });

mongoose.connect(dbConfig.uri);

const hostname = process.env.HOSTNAME || "localhost";
const port = Number(process.env.PORT) || 8000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url!!, true);
      const { pathname } = parsedUrl;

      // pathname === "graphql/ws" ? wsHandler(req) : handle(req, res, parsedUrl);
      handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  }).once("error", (err) => {
    console.error(err);
    process.exit(1);
  });
  const wsServer = new WebSocketServer({
    server: httpServer,
  });

  setWsServer(wsServer);

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
