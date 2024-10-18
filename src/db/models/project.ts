import mongoose, { Schema, Types } from "mongoose";
import {
  groupModelName,
  projectModelName,
  todoModelName,
  userModelName,
} from "./mongo_contract";
import { schemaComposer } from "graphql-compose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import { finalComposer, getMongooseResolvers } from "./graphqlComposeUtilities";

interface IProject {
  pm_id: Types.ObjectId;
  members: [Types.ObjectId];
  todos: [Types.ObjectId];
  group_id: Types.ObjectId;
}

const projectSchema = new Schema({
  pm_id: { type: Schema.Types.ObjectId, ref: userModelName },
  members: [{ type: Schema.Types.ObjectId, ref: userModelName }],
  todos: [{ type: Schema.Types.ObjectId, ref: todoModelName }],
  group_id: { type: Schema.Types.ObjectId, ref: groupModelName }, //required???
});

const customizationOptions = {};

const projectTC = finalComposer<IProject>(projectModelName, projectSchema);

schemaComposer.Query.addFields({
  ...getMongooseResolvers(projectTC, "project_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(projectTC, "project_").mutations,
});
export const graphqlschema = schemaComposer.buildSchema();
