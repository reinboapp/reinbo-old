import AES from "crypto-js/aes";
import { CREATE_MESSAGE } from "../../constants";

export default async (
  _,
  { input: { content } },
  { eventEmitter: { chatEmitter }, authUser, models: { Message, Conversation } }
) => {
  const returnData = {
    // from: authUser._id,
    content
  };

  return returnData;
};
