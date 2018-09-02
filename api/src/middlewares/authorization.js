const isLoggedIn = async (resolve, _, args, { authUser }, info) => {
  if (!authUser._id) {
    throw new Error(`Not authorized!`);
  }
  return resolve();
};

export default {
  Mutation: {
    // messageMutation: isLoggedIn
  }
};
