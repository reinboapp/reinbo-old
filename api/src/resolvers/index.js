import { mergeResolvers } from "merge-graphql-schemas";

import conversationResolvers from "./conversation.resolvers";
import messageResolvers from "./message.resolvers";
import userResolvers from "./user.resolvers";

import usernameScalar from "./customScalars/username.scalar";
import passwordScalar from "./customScalars/password.scalar";
import emailScalar from "./customScalars/email.scalar";
import fullnameScalar from "./customScalars/fullname.scalar";
import dateScalar from "./customScalars/date.scalar";
import jwtScalar from "./customScalars/jwt.scalar";

const resolversArray = [
  // scalar
  usernameScalar,
  fullnameScalar,
  passwordScalar,
  emailScalar,
  dateScalar,
  jwtScalar,
  // resolvers
  conversationResolvers,
  messageResolvers,
  userResolvers
];

const resolvers = mergeResolvers(resolversArray);

export default resolvers;
