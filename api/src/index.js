require("now-env");
require("pretty-error").start();
import { GraphQLServer, PubSub } from "graphql-yoga";

import mongoose from "mongoose";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import models from "./models";
import middlewares from "./middlewares";

import jwtMiddleware, {
  decode as decodeJwtAndGetUser
} from "./middlewares/express/jwtMiddleware";
import eventEmitter from "./eventEmitter";

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
  // tracing: true
};

const context = async req => {
  let authUser = {};
  if (req.request) {
    authUser = req.request.user;
  } else if (
    req.connection &&
    req.connection.context &&
    req.connection.context.authorization &&
    req.connection.context.authorization.split(" ")[0] === "Bearer"
  ) {
    const token = req.connection.context.authorization.split(" ")[1];
    authUser = await decodeJwtAndGetUser(token);
  }
  return {
    authUser,
    models,
    pubsub: new PubSub(),
    eventEmitter
  };
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context,
  middlewares
});
server.express.use(jwtMiddleware);
server.start(options, ({ port }) =>
  console.log(`Server is running on localhost:${port}`)
);
