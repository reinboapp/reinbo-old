require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";

import mongoose, { Query } from "mongoose";
import jwt from "jsonwebtoken";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import models from "./models";

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {});

const options = {
  port: process.env.PORT
};

const context = req => {
  // req.reqc
  return {
    user: req.request.user
  };
};

const server = new GraphQLServer({ typeDefs, resolvers, context });
server.express.use(async (req, res, next) => {
  req.user = {};
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const decodedJwt = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedJwt;
    }
    next();
  } catch (e) {
    next();
  }
});
server.start(options, ({ port }) =>
  console.log(`Server is running on localhost:${port}`)
);
