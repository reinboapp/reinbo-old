export default async (_, { input }, { models }) => {
  const { User } = models;
  // validate
  const { username, password, email } = input;
  if (!username) return new Error("username not valid");
  if (!password) return new Error("password not valid");
  if (!email) return new Error("email not valid");

  // save to database
  const newUser = new User({ username, password, email });
  try {
    const newUserData = await newUser.save();
    // response
    return {
      id: newUserData._id,
      username,
      success: true
    };
  } catch (e) {
    // database error
    return new Error("Database error: " + e.message);
  }
};
