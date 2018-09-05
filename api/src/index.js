require("now-env");
require("pretty-error").start();
import { GraphQLServer, PubSub } from "graphql-yoga";

import mongoose from "mongoose";
import redis from "redis";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import models from "./models";
import middlewares from "./middlewares";

import jwtMiddleware, {
  decode as decodeJwtAndGetUser
} from "./middlewares/express/jwtMiddleware";
import uaParser from "./middlewares/express/uaParser";

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
  let userAgent = "";
  if (req.request) {
    authUser = req.request.user;
    userAgent = req.request.userAgent;
  } else if (
    req.connection &&
    req.connection.context &&
    req.connection.context.authorization &&
    req.connection.context.authorization.split(" ")[0] === "Bearer"
  ) {
    const token = req.connection.context.authorization.split(" ")[1];
    authUser = await decodeJwtAndGetUser(token);
  }
  const pubsub = new PubSub();
  const redisClient = redis.createClient({
    url: process.env.REDIS_URI,
    db: 6
  });
  return {
    authUser,
    userAgent,
    models,
    pubsub,
    redisClient,
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
server.express.use(uaParser);
server.start(options, ({ port }) =>
  console.log(`Server is running on localhost:${port}`)
);
