import { ObjectTypeComposer, ObjMap, Resolver } from "graphql-compose";
import mongoose from "mongoose";

type MongooseResolvers = {
  queries: ObjMap<Resolver<any, any, any, any>>;
  mutations: ObjMap<Resolver<any, any, any, any>>;
};

/**
 * @description returns object containing all resolvers of objectTC created with composeWithMongoose()
 * @param objecTC The ObjectTypeComposer to get mongoose resolvers from
 * @param resolversPrefix the prefix that to every mongoose resolver's name
 * @returns object with properties "queries" and "mutations", each containing mongoose resolvers related to that operations
 * @field q
 */
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
