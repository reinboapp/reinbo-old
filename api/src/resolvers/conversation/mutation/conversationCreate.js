const conversationCreate = async (
  _,
  {
    input: {
      name,
      conversationName,
      description = "",
      isPublic = false,
      isGroup = false,
      user2
    }
  },
  { eventEmitter: { chatEmitter }, authUser, models: { Conversation, User } }
) => {
  let dataToSave = {};
  const authId = authUser.id;

  if (isGroup) {
    if (!conversationName) return new Error("invalid conversationName");
    if (!description) return new Error("invalid description");
    if (!name) return new Error("invalid name");

    dataToSave = {
      owner: authId,
      conversationName,
      description,
      name,
      isGroup,
      isPublic
    };
  } else {
    if (!user2) return new Error("please provide valid id");
    const user1 = authId.toString();
    let foundUser = {};
    try {
      foundUser = await User.findById(user2);
    } catch (e) {
      return new Error("User2 not found");
    }

    let convName = user1 + user2;
    if (user2 > user1) convName = user2 + user1;

    dataToSave = {
      conversationName: convName,
      members: [user1, user2],
      description,
      name,
      isGroup,
      isPublic: false
    };
  }

  const newConversation = new Conversation(dataToSave);

  let newConversationData = newConversation;
  try {
    newConversationData = await newConversation.save();
  } catch (e) {
    return new Error(e.message);
  }

  return newConversationData;
};

export default conversationCreate;
