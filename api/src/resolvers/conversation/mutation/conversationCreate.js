import { PUBLIC, GROUP } from "../../constants";
/**
 * create GROUP conversation by default
 *
 * PRIVATE conversation handled in createMessage, when first message sent
 * SECRET conversation handled in createUser
 */
const conversationCreate = async (
  _,
  {
    input: {
      name,
      conversationName,
      description = "",
      channels = [],
      privacyType = PUBLIC,
      sizeType = GROUP
    }
  },
  { eventEmitter: { chatEmitter }, authUser, models: { Conversation } }
) => {
  if (!conversationName || !name) {
    return new Error("invalid data");
  }
  const newConversation = new Conversation({
    conversationName,
    description,
    publicKey,
    name,
    privacyType,
    sizeType
  });
  channels.forEach(item => newConversation.push(item));
  // console.log(newConversation);

  return newConversation;
};

export default conversationCreate;
