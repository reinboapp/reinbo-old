require("now-env");
import mongoose from "mongoose";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ms from "ms";

import { redisClient } from "../index";
import { REDIS_PREFIX_REFRESH_TOKEN } from "../resolvers/constants";

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
  const ONE_HOUR = "1h";
  const jwtOptions = { expiresIn: ONE_HOUR };
  const accessToken = await jwt.sign(
    { id: user.id },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtOptions
  );
  return accessToken;
};

/**JWT: generate refreshToken from user
 * refreshToken is used for generating new token
 * contains device information (user-agent)
 * and save to redis in 7d
 * @param data contains userId and UA string
 */
userSchema.methods.generateRefreshToken = async function({ id, ua }) {
  const ONE_WEEK = "7d";
  const jwtOptions = { expiresIn: ONE_WEEK };
  const refreshToken = await jwt.sign(
    { id, ua },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    jwtOptions
  );

  /**save refreshToken to redis*/
  redisClient.set(
    `${REDIS_PREFIX_REFRESH_TOKEN}:${refreshToken}`,
    id,
    "EX",
    ms(ONE_WEEK)
  );

  return refreshToken;
};

/**JWT: exchange refresh token with new accesstoken and refresh token
 * 1. check refreshToken exist in redis, delete it
 * 2. create new accessToken and refreshToken, save it
 */
userSchema.methods.exchangeRefreshToken = async function(refreshToken) {};

export default mongoose.model("User", userSchema);
