import mongoose, { Schema } from "mongoose";
import {
  groupModelName,
  projectModelName,
  todoModelName,
  userModelName,
} from "./mongo_contract";
import { schemaComposer } from "graphql-compose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import { getMongooseResolvers } from "./graphqlComposeUtilities";

const projectSchema = new Schema({
  pm_id: { type: Schema.Types.ObjectId, ref: userModelName },
  members: [{ type: Schema.Types.ObjectId, ref: userModelName }],
  todos: [{ type: Schema.Types.ObjectId, ref: todoModelName }],
  group_id: { type: Schema.Types.ObjectId, ref: groupModelName }, //required???
});

const projectModel = mongoose.model(projectModelName, projectSchema);

const customizationOptions = {};

const projectTC = composeWithMongoose(projectModel, customizationOptions);

schemaComposer.Query.addFields({
  ...getMongooseResolvers(projectTC, "project_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(projectTC, "project_").mutations,
});
