import { Schema, Types } from "mongoose";
import {
  freebusyModelName,
  IfbDateTime,
  ifbDateTime,
  userModelName,
} from "./mongo_contract";
import { schemaComposer } from "graphql-compose";
import { finalComposer, getMongooseResolvers } from "./graphqlComposeUtilities";

//dtstamp / uid (obbligatori)
//contact  (optional maxone)
// comment / x-prop / iana-prop

interface IFreebusy {
  start_date: string; //dtstart
  end_date: string; //dtend
  organizer: Types.ObjectId;
  url: string;
  request_status: string; //rstatus
  attendees: [Types.ObjectId]; //attendee
  freebusy_infos: [IfbDateTime];
}

const freebusySchema = new Schema<IFreebusy>({
  start_date: { type: String, required: true },
  end_date: { type: String, required: true },
  organizer: { type: Schema.Types.ObjectId, ref: userModelName },
  url: { type: String },
  request_status: { type: String },
  attendees: [{ type: Schema.Types.ObjectId, ref: userModelName }],
  freebusy_infos: [ifbDateTime],
});

export const freebusyTC = finalComposer<IFreebusy>(
  freebusyModelName,
  freebusySchema,
);

schemaComposer.Query.addFields({
  ...getMongooseResolvers(freebusyTC, "freebusy_").queries,
});

schemaComposer.Mutation.addFields({
  ...getMongooseResolvers(freebusyTC, "freebusy_").mutations,
});

export const graphqlschema = schemaComposer.buildSchema();
