require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";

import mongoose from "mongoose";

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

const context = {
  models
};

const server = new GraphQLServer({ typeDefs, resolvers, context });
server.start(options, ({ port }) =>
  console.log(`Server is running on localhost:${port}`)
);
