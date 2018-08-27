export default async (_, { input }, { models }) => {
  const { User } = models;
  // validate
  const { username, password } = input;
  if (!username) return new Error("username not valid");
  if (!password) return new Error("password not valid");

  // check in database
  try {
    const foundUser = await User.findOne({ username });
    if (!foundUser) return new Error("username not found");

    const passwordMatch = await foundUser.comparePassword(password);
    if (!passwordMatch) return new Error("password wrong");

    return {
      id: foundUser._id,
      username,
      success: true,
      token: foundUser.getToken()
    };
  } catch (e) {
    // database error
    return new Error("Database error: " + e.message);
  }
};
