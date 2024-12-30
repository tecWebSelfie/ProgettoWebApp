import { yoga } from "../yogaServer";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
// const ws = new WebSocketServer({ noServer: true });

export const setWsServer = (ws: WebSocketServer) => {
  ws.on("connection", (ws) => {
    console.log("ws connection");
    ws.on("message", (message) => {
      console.log("received: " + message);
      ws.send("something");
    });
    ws.on("close", () => {
      console.log("ws close");
    });
  });

  ws.on("error", (err) => {
    console.error(err.message);
  });

  // eslint-disable-next-line
  useServer(
    {
      execute: (args: any) => args.rootValue.execute(args),
      subscribe: (args: any) => args.rootValue.subscribe(args),
      onSubscribe: async (ctx, msg) => {
        const { schema, execute, subscribe, contextFactory, parse, validate } =
          yoga.getEnveloped({
            ...ctx,
            req: ctx.extra.request,
            socket: ctx.extra.socket,
            params: msg.payload,
          });

        const args = {
          schema,
          operationName: msg.payload.operationName,
          document: parse(msg.payload.query),
          variableValues: msg.payload.variables,
          contextValue: await contextFactory(),
          rootValue: {
            execute,
            subscribe,
          },
        };

        const errors = validate(args.schema, args.document);
        if (errors.length) return errors;
        return args;
      },
    },
    ws,
  );
};

// export const wsHandler = async function (request: IncomingMessage) {
//   console.log("socket property is undefined?", request.socket === undefined);
//   return ws.handleUpgrade(
//     request,
//     request.socket,
//     Buffer.alloc(512),
//     (socket) => {
//       ws.emit("connection", socket, request);
//     }
//   );
// };
