import { REDIS_PREFIX_REFRESH_TOKEN } from "../constants";
import ms from "ms";
export default async (
  _,
  { input: { username, password, email, fullname } },
  { models, userAgent, redisClient }
) => {
  const { User } = models;
  /**validate data */
  if (!username) return new Error("username not valid");
  if (!password) return new Error("password not valid");
  if (!fullname) return new Error("fullname not valid");
  if (!email) return new Error("email not valid");

  /** save to database */
  const newUser = new User({ username, fullname, password, email, bio });

  let newUserData = newUser;
  try {
    newUserData = await newUser.save();
  } catch (e) {
    return new Error(e.message);
  }

  const { id } = newUserData;
  const ua = userAgent;

  /**generate accessToken and refreshToken */
  const accessToken = await newUser.generateAccessToken();
  const refreshToken = await newUser.generateRefreshToken({ id, ua });

  /** return */
  return {
    id,
    accessToken,
    refreshToken,
    ...newUserData.toJSON()
  };
};
