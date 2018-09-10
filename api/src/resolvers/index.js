import { mergeResolvers } from "merge-graphql-schemas";

import emailScalar from "./customScalars/email.scalar";
import fullnameScalar from "./customScalars/fullname.scalar";
import passwordScalar from "./customScalars/password.scalar";
import usernameScalar from "./customScalars/username.scalar";

import dateScalar from "./customScalars/date.scalar";
import jwtScalar from "./customScalars/jwt.scalar";
import mongoIdScalar from "./customScalars/mongoId.scalar";
import urlScalar from "./customScalars/url.scalar";

import conversationResolvers from "./conversation.resolvers";
import messageResolvers from "./message.resolvers";
import userResolvers from "./user.resolvers";
import testResolvers from "./test.resolvers";

const resolversArray = [
  // scalar
  emailScalar,
  fullnameScalar,
  passwordScalar,
  usernameScalar,
  //
  dateScalar,
  jwtScalar,
  mongoIdScalar,
  urlScalar,
  // resolvers
  conversationResolvers,
  messageResolvers,
  userResolvers,
  testResolvers
];

const resolvers = mergeResolvers(resolversArray);

const getKeys = obj => Object.keys(obj ? obj : {});
/**get all 'keys' from resolvers
 * used in middlewares
 */
export const resolversKeys = {
  Mutation: getKeys(resolvers.Mutation),
  Query: getKeys(resolvers.Query),
  Subscription: getKeys(resolvers.Subscription)
};

export default resolvers;
