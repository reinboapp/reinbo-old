import { REDIS_PREFIX_REFRESH_TOKEN } from "../constants";

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
  const newUser = new User({ username, fullname, password, email });
  let newUserData = newUser;
  try {
    newUserData = await newUser.save();
  } catch (e) {
    return new Error(e);
  }

  /**generate accessToken and refreshToken */
  const accessToken = await newUser.generateAccessToken();
  const refreshToken = await newUser.generateRefreshToken({
    id: newUserData._id,
    ua: userAgent
  });

  /**save refreshToken to redis
   * with expired 7d = 86400 * 7
   */
  redisClient.set(
    `${REDIS_PREFIX_REFRESH_TOKEN}:${newUserData._id}:${refreshToken}`,
    1,
    "EX",
    604800
  );

  /** return */
  return {
    id: newUserData._id,
    username: newUserData.username,
    fullname: newUserData.fullname,
    bio: newUserData.bio,
    success: true,
    accessToken,
    refreshToken
  };
};
