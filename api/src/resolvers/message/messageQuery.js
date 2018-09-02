import { withFilter } from "graphql-yoga";

const CREATE_CHAT = "create_chat";
const DELETE_CHAT = "delete_chat";

export default {
  // resolve: async (payload, args, { authUser }, info) => {
  //   console.log(payload);
  //   // Manipulate and return the new value
  //   // console.log(info);
  //   if (!authUser._id) {
  //     return new Error("not authorized");
  //   }
  //   return payload;
  // },
  subscribe: withFilter(
    (_, args, { pubsub, eventEmitter }) => {
      const { chatEmitter } = eventEmitter;

      chatEmitter.on(CREATE_CHAT, ({ userId, text }) => {
        pubsub.publish(CREATE_CHAT, { chatGet: { userId, text } });
      });

      return pubsub.asyncIterator([CREATE_CHAT, DELETE_CHAT]);
    },
    ({ chatGet }, args, { authUser }) => {
      if (!authUser._id) {
        return false;
      }
      if (authUser._id.equals(chatGet.userId)) {
        return true;
      }
      return true;
    }
  )
};
