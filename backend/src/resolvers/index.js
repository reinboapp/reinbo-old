import { mergeResolvers } from "merge-graphql-schemas";

import welcomeResolvers from "./welcome.resolvers";
import userResolvers from "./user.resolvers";

import oddScalar from "./scalars/odd.scalar";
import usernameScalar from "./scalars/username.scalar";
import passwordScalar from "./scalars/password.scalar";
import emailScalar from "./scalars/email.scalar";

const resolversArray = [
  // scalar
  oddScalar,
  usernameScalar,
  passwordScalar,
  emailScalar,
  // resolvers
  welcomeResolvers,
  userResolvers
];

const resolvers = mergeResolvers(resolversArray);

export default resolvers;
