import envValues from "../../config/envConfig";
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/user";

/**
 * Registers a new user.
 * @param password Non-encrypted password
 * @returns A Promise that resolves in the recently created object or a string with the error message.
 */
const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<IUser | string> => {
  try {
    //verify the new username is unique
    const existingUser = await User.find({
      $or: [{ username }, { email }],
    });

    if (existingUser.length > 0) {
      return "The information provided belongs to an existing user.";
    }

    const user = new User({
      username,
      password: await bcrypt.hash(password, envValues.SaltLength),
      email,
    });

    return await user.save();
  } catch (error) {
    throw new Error("Error when creating a user: " + error);
  }
};

export { createUser };
