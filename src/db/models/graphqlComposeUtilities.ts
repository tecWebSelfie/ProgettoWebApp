import { ObjectTypeComposer, ObjMap, Resolver } from "graphql-compose";
import mongoose from "mongoose";

type MongooseResolvers = {
  queries: ObjMap<Resolver<any, any, any, any>>;
  mutations: ObjMap<Resolver<any, any, any, any>>;
};

export function getMongooseResolvers(
  objecTC: ObjectTypeComposer<mongoose.Document<unknown, any, any>, any>,
  resolversPrefix: String,
): MongooseResolvers {
  let mongooseResolvers: MongooseResolvers = {
    queries: {},
    mutations: {},
  };

  for (const resolver of objecTC.getResolvers()) {
    if (
      resolver[0].startsWith("create") ||
      resolver[0].startsWith("update") ||
      resolver[0].startsWith("remove")
    ) {
      mongooseResolvers.mutations[resolversPrefix + resolver[0]] = resolver[1];
    } else {
      mongooseResolvers.queries[resolversPrefix + resolver[0]] = resolver[1];
    }
  }

  return mongooseResolvers;
}
