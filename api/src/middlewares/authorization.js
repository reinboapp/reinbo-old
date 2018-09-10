import { resolversKeys } from "../resolvers/";
const createAuth = () => {
  return async (resolve, _, args, { authUser }, info) => {
    if (!authUser.id) {
      throw new Error(`Not authorized!`);
    }
    return resolve();
  };
};
const passAuth = resolve => resolve();
const withAuth = (key = "Mutation") => {
  const rate = {};
  resolversKeys[key].forEach(item => {
    rate[item] = createAuth();
  });
  return rate;
};

export default {
  Mutation: {
    ...withAuth("Mutation"),

    userLogin: passAuth,
    userRegister: passAuth
  },
  Query: {
    ...withAuth("Query"),

    publicPing: passAuth
  },
  Subscription: {
    ...withAuth("Subscription")
  }
};
