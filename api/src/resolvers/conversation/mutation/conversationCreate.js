import AES from "crypto-js/aes";
import { PUBLIC, GROUP } from "../../constants";
/**
 * create GROUP conversation by default
 * PRIVATE conversation handled in createMessage, when first message sent
 * SECRET conversation handled in createUser
 */
const conversationCreate = async (
  _,
  {
    input: {
      name,
      conversationId,
      description = "",
      channels = [],
      privacyType = PUBLIC,
      sizeType = GROUP
    }
  },
  { eventEmitter: { chatEmitter }, authUser, models: { Conversation } }
) => {
  if (!conversationId || !name) {
    return new Error("invalid data");
  }
  const newConversation = new Conversation({
    channels: ["general", "secret", ...channels],
    conversationId,
    description,
    publicKey: "sdfds",
    name,
    privacyType,
    sizeType
  });
  console.log(newConversation);

  return newConversation;
};

export default conversationCreate;
