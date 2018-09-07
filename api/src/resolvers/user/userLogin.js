export default async (_, { input }, { models, userAgent }) => {
  const { User } = models;
  // validate
  const { username, password, email } = input;
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

    const accessToken = await foundUser.generateAccessToken();
    const refreshToken = await foundUser.generateRefreshToken({
      id: foundUser._id,
      ua: userAgent
    });
    return {
      id: foundUser._id,
      success: true,
      username: foundUser.username,
      fullname: foundUser.fullname,
      email: foundUser.email,
      accessToken,
      refreshToken
    };
  } catch (e) {
    // database error
    return new Error("Database error: " + e.message);
  }
};
