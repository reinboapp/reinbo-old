import conversationMutation from "./conversation/conversationMutation";

const conversationResolvers = {
  Mutation: {
    conversationMutation
  },
  Subscription: {}
};

export default conversationResolvers;
