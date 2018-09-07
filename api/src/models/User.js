require("now-env");
import mongoose from "mongoose";

// import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String }
  },
  {
    timestamps: true
  }
);

/**before save, encrypt password */
userSchema.pre("save", async function(next) {
  // using function, not using () => because of "this"
  const user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(
      parseInt(process.env.PASSWORD_SALT_FACTOR)
    );
    const passwordHash = await bcrypt.hash(user.password, salt);
    user.password = passwordHash;
    next();
  } catch (e) {
    next(e);
  }
});

/** check sent password with database */
userSchema.methods.comparePassword = async function(candidatePassword) {
  const user = this;
  const match = await bcrypt.compare(candidatePassword, user.password);
  return match;
};

/** JWT: generate accessToken from user */
userSchema.methods.generateAccessToken = async function() {
  const user = this;
  const { _id } = user;
  // one hour expired time
  const jwtOptions = {
    expiresIn: "1h"
  };
  const accessToken = await jwt.sign(
    { _id },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtOptions
  );
  return accessToken;
};

/**JWT: generate refreshToken from user
 * refreshToken is used for generating new token
 * contains device information (user-agent)
 * and save to database
 * @param data contain UA string
 */
userSchema.methods.generateRefreshToken = async function(data) {
  // const user = this;
  // one week expired time
  const jwtOptions = {
    expiresIn: "7d"
  };
  const refreshToken = await jwt.sign(
    { data },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    jwtOptions
  );
  return refreshToken;
};

export default mongoose.model("User", userSchema);
