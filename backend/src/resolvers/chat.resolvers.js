import chatSend from "./chat/chatSend";
import chatGet from "./chat/chatGet";

export default {
  Mutation: {
    chatSend
  },
  Subscription: {
    chatGet
  }
};
