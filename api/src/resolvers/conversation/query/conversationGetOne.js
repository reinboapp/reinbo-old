const conversationGetOne = async (
  _,
  { query: { id } },
  { authUser, models: { Conversation } }
) => {
  if (!id) return new Error("please provide id");
  const returnData = await Conversation.findById(id).populate("members");
  if (!returnData) {
    return new Error("Data not found");
  }
  return returnData;
};

export default conversationGetOne;
