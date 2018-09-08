require("now-env");
import jwt from "jsonwebtoken";
import User from "../../models/User";

export const decode = async token => {
  const decodedJwt = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
  if (decodedJwt.id) {
    const userId = decodedJwt.id;
    const foundUser = await User.findById(userId);
    return foundUser;
  }
  return {};
};

// headers authorization Bearer: asfdasdfasdfasdf
// if valid , will assign req.user
export default async (req, res, next) => {
  req.user = {};
  req.error = {};

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const decodedUser = await decode(token);
      req.user = {
        id: decodedUser._id,
        ...decodedUser
      };
    }
    next();
  } catch (e) {
    req.error = {
      message: e.message,
      authError: true
    };
    next();
  }
};
