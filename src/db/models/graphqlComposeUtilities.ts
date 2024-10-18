import { ObjectTypeComposer, ObjMap, Resolver } from "graphql-compose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import mongoose from "mongoose";

type MongooseResolvers = {
  queries: ObjMap<Resolver<any, any, any, any>>;
  mutations: ObjMap<Resolver<any, any, any, any>>;
};

/**
 * @description returns object containing all mongoose resolvers of objectTC created with composeWithMongoose()
 * @param objecTC The ObjectTypeComposer to get mongoose resolvers from
 * @param resolversPrefix the prefix to every mongoose resolver's name
 * @returns object with properties "queries" and "mutations", each containing mongoose resolvers related to that operations
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

export function finalComposer<T>(name: string, schema: mongoose.Schema) {
  const model = mongoose.model<T>(name, schema);

  type documentType =
    typeof model extends mongoose.Model<infer T>
      ? mongoose.HydratedDocument<T>
      : never;

  return composeWithMongoose<documentType>(model);
}
