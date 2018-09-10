export default {
  Query: {
    publicPing: () => {
      return "public pong";
    },
    secretPing: (_, args, { authUser }) => {
      return `secret pong, user:${authUser.id}`;
    }
  }
};
