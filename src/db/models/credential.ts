import mongoose, { Schema, Types } from "mongoose";
import { credentialModelName, userModelName } from "./mongo_contract";

interface ICredential {
  userId: Types.ObjectId;
  email: string;
  password: NonNullable<string>;
}

const credentialSchema = new Schema<ICredential>({
  userId: { type: Schema.Types.ObjectId, ref: userModelName, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const credentialModel =
  (mongoose.models[credentialModelName] as mongoose.Model<ICredential>) ||
  mongoose.model<ICredential>(credentialModelName, credentialSchema);
