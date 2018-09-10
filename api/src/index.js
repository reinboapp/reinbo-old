require("now-env");
require("pretty-error").start();
import { GraphQLServer, PubSub } from "graphql-yoga";

/** database */
import mongoose from "mongoose";
import Redis from "ioredis";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import models from "./models";
import middlewares from "./middlewares";

/** middlewares */
import helmet from "helmet";
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

/**Redis Instance */
export const redisClient = new Redis(process.env.REDIS_URI);

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
  const { request, connection } = req;
  return {
    request,
    connection,
    authUser,
    userAgent,
    models,
    pubsub,
    redisClient,
    eventEmitter
  };
};

/**create graphql server */
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context,
  middlewares
});

/**express middleware */
server.express.use(helmet());
server.express.use(jwtMiddleware);
server.express.use(uaParser);

/**start server */
const options = {
  port: process.env.PORT
  // tracing: true
};

server.start(options, ({ port }) =>
  console.log(`Server is running on localhost:${port}`)
);
