import mongoose, { Schema } from "mongoose";
import {
  eventModelName,
  journalModelName,
  pomodoroModelName,
} from "./mongo_contract";

const pomodoroSchema = new Schema({
  study_time: Number,
  remaining_study_time: Number,
  rest_time: Number,
  remaining_rest_time: Number,
  repetition: Number,
  remaining_repetition: Number,
  is_studying_time: Boolean,
  is_over: Boolean,
  journals: [{ type: Schema.Types.ObjectId, ref: journalModelName }],
  event: { type: Schema.Types.ObjectId, ref: eventModelName },
});

const pomodoroModel = mongoose.model(pomodoroModelName, pomodoroSchema);
