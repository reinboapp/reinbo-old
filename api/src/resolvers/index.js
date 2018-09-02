import { mergeResolvers } from "merge-graphql-schemas";

import userResolvers from "./user.resolvers";
import messageResolvers from "./message.resolvers";

import usernameScalar from "./customScalars/username.scalar";
import passwordScalar from "./customScalars/password.scalar";
import emailScalar from "./customScalars/email.scalar";
import fullnameScalar from "./customScalars/fullname.scalar";

const resolversArray = [
  // scalar
  usernameScalar,
  fullnameScalar,
  passwordScalar,
  emailScalar,
  // resolvers
  userResolvers,
  messageResolvers
];

const resolvers = mergeResolvers(resolversArray);

export default resolvers;
