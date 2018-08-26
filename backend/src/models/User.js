require("dotenv").config();
import mongoose from "mongoose";
// import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String }
});

userSchema.pre("save", async next => {
  const user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  const SALT_WORK_FACTOR = process.env.PASSWORD_SALT_FACTOR;
  try {
    const passwordHash = await bcrypt.hash(user.password, SALT_WORK_FACTOR);
    user.password = passwordHash;
    next();
  } catch (e) {
    next(e);
  }
});

userSchema.methods.comparePassword = async candidatePassword => {
  const user = this;
  const match = bcrypt.compare(candidatePassword, user.password);
  return match;
};

export default mongoose.model("User", userSchema);
