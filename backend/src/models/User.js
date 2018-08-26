require("dotenv").config();
import mongoose from "mongoose";
// import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String }
});

// not using () => because "this"

userSchema.pre("save", async function(next) {
  const user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  const SALT_WORK_FACTOR = parseInt(process.env.PASSWORD_SALT_FACTOR);

  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const passwordHash = await bcrypt.hash(user.password, salt);
    user.password = passwordHash;
    next();
  } catch (e) {
    next(e);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  const user = this;
  const match = await bcrypt.compare(candidatePassword, user.password);
  return match;
};

userSchema.methods.getToken = async function() {
  const user = this;
  const { username, _id } = user;
  const token = jwt.sign({ id: _id, username }, process.env.JWT_SECRET);
  return token;
};

export default mongoose.model("User", userSchema);
