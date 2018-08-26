import User from "../models/User";

export default {
  Mutation: {
    userRegister: async (_, { input }) => {
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
        console.log(e.message);
        return new Error("Database error");
      }
    },
    userLogin: async (_, { input }) => {
      // validata
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
        return new Error("Database error");
      }
    }
  }
};
