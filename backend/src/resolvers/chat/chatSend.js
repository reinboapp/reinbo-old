const CREATE_CHAT = "create_chat";

export default async (_, { input }, { eventEmitter, authUser, pubsub }) => {
  const { chatEmitter } = eventEmitter;
  let userId = 0;
  if (authUser._id) {
    userId = authUser._id;
  } else {
    return new Error("not authorized");
  }

  const { text } = input;
  const returnData = {
    userId,
    text
  };
  chatEmitter.emit(CREATE_CHAT, returnData);
  // pubsub.publish(CREATE_CHAT, { chatGet: returnData });
  return returnData;
};
