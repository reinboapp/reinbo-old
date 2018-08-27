require("dotenv").config();
import jwt from "jsonwebtoken";
import User from "../models/User";

import { chatEmitter } from "../eventEmitter";

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
      const decodedJwt = jwt.verify(token, process.env.JWT_SECRET);
      if (decodedJwt.id) {
        const userId = decodedJwt.id;
        chatEmitter.emit("event", userId);
        const foundUser = await User.findById(userId);
        req.user = foundUser;
      }
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
