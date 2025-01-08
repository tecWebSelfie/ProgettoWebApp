import { yoga } from "../yogaServer";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
// const ws = new WebSocketServer({ noServer: true });

export const setWsServer = (ws: WebSocketServer) => {
  // eslint-disable-next-line
  useServer(
    {
      onDisconnect(ctx, code, reason) {
        console.log("client disconnected");
      },
      onOperation(ctx, message, args, result) {
        console.log("operation started");
      },
      onClose(ctx, code, reason) {
        console.log("connection closed, code is: ", code);
      },
      onError(ctx, message, errors) {
        console.log("error occurred");
      },
      onComplete(ctx) {
        console.log("operation completed");
      },
      onConnect(ctx) {
        console.log("trying to connect");
      },
      onNext: (_, msg) => {
        console.log("onNext", msg.payload.data);
      },
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
