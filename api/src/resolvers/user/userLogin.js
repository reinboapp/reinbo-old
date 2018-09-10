export default async (
  _,
  { input: { username, password, email } },
  { models: { User }, userAgent }
) => {
  // validate
  if (!username && !email)
    return new Error("please provide valid email or username");
  if (!password) return new Error("password not valid");

  // check in database
  try {
    const query = {};
    if (email) {
      query.email = email;
    }
    if (username) {
      query.username = username;
    }

    const foundUser = await User.findOne(query);
    if (!foundUser) return new Error("user not found");

    const passwordMatch = await foundUser.comparePassword(password);
    if (!passwordMatch) return new Error("password wrong");

    const { id } = foundUser;
    const ua = userAgent;

    const accessToken = await foundUser.generateAccessToken();
    const refreshToken = await foundUser.generateRefreshToken({ id, ua });

    return {
      id,
      accessToken,
      refreshToken,
      ...foundUser.toJSON()
    };
  } catch (e) {
    return new Error("Database error: " + e.message);
  }
};
