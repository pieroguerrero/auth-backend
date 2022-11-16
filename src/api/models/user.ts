import { Schema, model, Document } from "mongoose";
//import bcrypt from "bcryptjs";

//To let typescript know what is going to autocomplete during the coding process
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  verified: boolean;
  // getEncrytedPassword(): Promise<string>;
  // validatePassword(passwordToCompare: string): Promise<boolean>;
}

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    min: 4,
    lowercase: true,
  },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  verified: { type: Boolean, required: true, default: false },
});

export default model<IUser>("User", userSchema);
