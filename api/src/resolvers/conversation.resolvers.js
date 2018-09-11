import conversationMutation from "./conversation/conversationMutation";
import conversationQuery from "./conversation/conversationQuery";

const conversationResolvers = {
  Mutation: {
    conversationMutation
  },
  Query: {
    conversationQuery
  },
  Subscription: {}
};

export default conversationResolvers;
