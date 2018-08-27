require("dotenv").config();
require("pretty-error").start();
import { GraphQLServer } from "graphql-yoga";

import mongoose from "mongoose";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import models from "./models";
import jwtMiddleware from "./middlewares/jwtMiddleware";

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useProjection: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {});

const options = {
  port: process.env.PORT
};

const context = req => {
  return {
    authUser: req.request.user,
    models
  };
};

const server = new GraphQLServer({ typeDefs, resolvers, context });
server.express.use(jwtMiddleware);
server.start(options, ({ port }) =>
  console.log(`Server is running on localhost:${port}`)
);
