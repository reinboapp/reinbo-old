import { mergeResolvers } from "merge-graphql-schemas";

import welcomeResolvers from "./welcome.resolvers";
import userResolvers from "./user.resolvers";
import chatResolvers from "./chat.resolvers";

import oddScalar from "./customScalars/odd.scalar";
import usernameScalar from "./customScalars/username.scalar";
import passwordScalar from "./customScalars/password.scalar";
import emailScalar from "./customScalars/email.scalar";

const resolversArray = [
  // scalar
  oddScalar,
  usernameScalar,
  passwordScalar,
  emailScalar,
  // resolvers
  welcomeResolvers,
  userResolvers,
  chatResolvers
];

const resolvers = mergeResolvers(resolversArray);

export default resolvers;
