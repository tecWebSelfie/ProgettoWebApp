import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  messageKey: "message",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

export const authLogger = logger.child({ logger: "auth.js" });

export const yogaRscLogger = logger.child({ logger: "YOGA RSC" });

// const logger = pino({
//   name: "Marco", //name of the logger
//   level: "warn", //minimum level to log, default is "info", if you want to specify a custom level, you need to pass a customLevels object
//   levelComparison: "ASC", // this property specifies how to compare levels, default is "DESC". You can pass a function too
//   customLevels: {
//     // if you want to specify custom levels
//     pippo: 35, //custom level
//     franco: 36, //custom level
//   },
//   useOnlyCustomLevels: false, // if you want to use only custom levels. Remember to specify default level in level property
//   depthLimit: 5, //how deep the logger should log the object if there are circular objects, default is 3
//   edgeLimit: 5, //Option to limit stringification of properties/elements when logging a specific object/array

//   //this function is called before the log is printed out. If you want to add static data, better use child loggers
//   mixin(
//     mergeObject /*the base log that will be printed out*/,
//     level /*the level of the log */,
//     logger /*logger infos */
//   ) {
//     //function to add custom properties to the log object
//     //REMEMBER TO RETURN A NEW OBJECT
//     return {
//       customProperty: "customValue",
//     };
//   },
//   mixinMergeStrategy(mergeObject, mixinObject) {
//     //function to merge the mixin object with the base log object
//     //REMEMBER TO RETURN A NEW OBJECT
//     return {
//       ...mergeObject,
//       ...mixinObject,
//     };
//   },
//   nestedKey: "nested", //the key under wich the logged object will be printed. Useful when the object has properties' keys that clash with the logger's keys.
//   redact: ["password"], //array or object that contains the keys to redact, more on https://getpino.io/#/docs/redaction
//   hooks: {
//     //hooks to various internal logger functions
//     logMethod(args, method, level) {
//       //gets the arg of a log method, the method name and the level, must return method.apply(logger, args)
//     },
//     //this is not the case, but if you have transports you can prepare the log before sending it with 'streamWrite' hook
//   },
//   formatters: {}, //object with custom log formatters for various parts of the logs
//   serializers: { err: pino.stdSerializers.err }, //object containing serializers for objects that you want to log.
//   msgPrefix: "Hello, ", //prefix for the message printed by logger and its children
//   base: {}, //base object that will be merged with the log object,
//   enabled: true, //if you want to disable the logger
//   timestamp: pino.stdTimeFunctions.isoTime, //function to get the timestamp of the log. If set to true, it will use pino.stdTimeFunctions.isoTime
//   messageKey: "message", //key of the message in the JSON log object. Default is "msg"
//   errorKey: "error", //key of the error in the JSON log object. Default is "err"
//   browser: {}, //options for browser logging
//   //with this option, you can specify a transport for the logger.
//   //  A transport is a function that takes a log object and sends it to a destination,
//   //  which often is a separate npm package or a different process
//   // DO NOT USE THE SECONDO PARAMETER OF THE PINO INITIALIZATION FUNCTION IF YOU USE THIS PROPERTY!!!
//   transport: {},
// });

// // parameters of logs are: log object, message, and interpolation values for the message string
// //if Error objects are passed as arguments, they will be serialized and added to the log object to the 'err' key
// //  and msg will be set to the error message
// logger.info({ message: "Hello, world!" }, "This is a message %d", 42);

// //create a child logger from the parent logger, with same stdout and level (which can be changed later)
// //the first argument is an object that will always be logged within every log of the child logger
// const childLogger = logger.child({ child: "logger" }, {});
