import AES from "crypto-js/aes";
import { CREATE_MESSAGE } from "../../constants";
/**
 * save Message to database and create PRIVATE Conversation if not exist
 */
const messageCreate = async (
  _,
  { input: { content, type } },
  { eventEmitter: { chatEmitter }, authUser, models: { Message, Conversation } }
) => {
  const returnData = {
    // from: authUser._id,
    content,
    type
  };

  return returnData;
};

export default messageCreate;
