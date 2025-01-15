import mongoose, { Schema, Types } from "mongoose";
import {
  eventModelName,
  journalModelName,
  pomodoroModelName,
} from "./mongo_contract";
import { schemaComposer } from "graphql-compose";
import { finalComposer, getMongooseResolvers } from "./graphqlComposeUtilities";

interface IPomodoro {
  study_time: number;
  remaining_study_time: number;
  rest_time: number;
  remaining_rest_time: number;
  repetition: number;
  remaining_repetition: number;
  is_studying_time: boolean;
  is_over: boolean;
  event: Types.ObjectId;
}

const pomodoroSchema = new Schema<IPomodoro>({
  study_time: Number,
  remaining_study_time: Number,
  rest_time: Number,
  remaining_rest_time: Number,
  repetition: Number,
  remaining_repetition: Number,
  is_studying_time: Boolean,
  is_over: Boolean,
  event: { type: Schema.Types.ObjectId, ref: eventModelName },
});

export const pomodoroTC = finalComposer<IPomodoro>(
  pomodoroModelName,
  pomodoroSchema,
);

schemaComposer.Query.addFields({
  ...getMongooseResolvers(pomodoroTC, "pomodoro_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(pomodoroTC, "pomodoro_").mutations,
});

export const graphqlschema = schemaComposer.buildSchema();
