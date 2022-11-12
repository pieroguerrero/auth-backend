import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

//To let typescript know what is going to autocomplete during the coding process
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  getEncrytedPassword(): Promise<string>;
  validatePassword(passwordToCompare: string): Promise<boolean>;
}

const userSchema = new Schema({
  username: { type: String, required: true, min: 4, lowercase: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true },
});

// userSchema.methods.encrytPassword = async (
//   password: string
// ): Promise<string> => {
//   const salt = await bcrypt.genSalt();
//   return bcrypt.hash(password, salt);
// };

userSchema.methods.getEncrytedPassword = async function (): Promise<string> {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(this.password, salt);
};

userSchema.methods.validatePassword = async function (
  passwordToCompare: string
): Promise<boolean> {
  return bcrypt.compare(passwordToCompare, this.password);
};

export default model<IUser>("User", userSchema);
