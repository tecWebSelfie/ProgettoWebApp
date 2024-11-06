import {
  ObjectTypeComposer,
  ObjectTypeComposerRelationArgsMapper,
  ObjMap,
  Resolver,
  schemaComposer,
} from "graphql-compose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import mongoose, { Types } from "mongoose";

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

interface RelationOption<T> {
  relTC: ObjectTypeComposer;
  idField: string;
  relField: string;
  resolver: string;
  prepareArgs: ObjectTypeComposerRelationArgsMapper<T, any, any>;
}

export function finalComposer<T>(
  name: string,
  schema: mongoose.Schema,
  relationOptions?: RelationOption<T>[],
) {
  const model =
    (mongoose.models[name] as mongoose.Model<T>) ||
    mongoose.model<T>(name, schema);

  type documentType =
    typeof model extends mongoose.Model<infer T>
      ? mongoose.HydratedDocument<T>
      : never;

  //return addRelations(composeWithMongoose<documentType>(model), schema);
  return composeWithMongoose<documentType>(model);
}

function addRel(
  mainTC: ObjectTypeComposer,
  relTC: ObjectTypeComposer,
  idField: string,
  relField: string,
  resolver: string,
  prepareArgs: ObjectTypeComposerRelationArgsMapper<any, any, any>,
) {
  if (mainTC.getField(idField) != undefined) return mainTC;

  mainTC.addRelation(relField, {
    resolver: relTC.getResolver(resolver),
    prepareArgs: prepareArgs,
    projection: {
      idField: true,
    },
  });
}

/*
export function addRelations(
  objectTC: ObjectTypeComposer,
  schema: mongoose.Schema
) {
  for (let fieldName in objectTC.getFields()) {
    let isArray = schema.path(fieldName).instance == "Array";

    //console.log(!objectTC.getFieldTypeName(fieldName).localeCompare("[MongoID]"))
    //console.log(fieldName);
    //console.log(schema.path(fieldName).options.type);
    // console.log(schema.path(fieldName));

    if (
      // fieldName.startsWith("") &&
      schema.path(fieldName).options.ref != undefined ||
      !objectTC.getFieldTypeName(fieldName).localeCompare("[MongoID]")
    ) {
      const newFieldName =
        fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
      const OTCName = isArray ? newFieldName.slice(0, -1) : newFieldName;
      //console.log("newFieldName is :" + newFieldName);
      //console.log("OTCName is :" + OTCName);
      //const OTCName = fieldName[0]ieldName.replace("","").endsWith("Id") ? fieldName.replace("Id", "") : fieldName.replace("Ids", "");
      objectTC.addRelation(newFieldName, {
        resolver: () =>
          schemaComposer
            .getOTC(OTCName)
            .getResolver(isArray ? "findByIds" : "findById"),
        prepareArgs: {
          _id: (object) => object[fieldName],
          _ids: (object) => object[fieldName] || [],
        },
        projection: {
          fieldName: true,
        },
      });
    }
  }
  console.log("fine");
  //console.log("finished to add relations to " + objectTC.getTypeName());

  // console.log(schema.path("event"));
  //console.log(schema.path("journals").options);
  //console.log(schema.path("journals").options.ref);

  return objectTC;
}
*/
