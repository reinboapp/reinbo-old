require("now-env");
import mongoose from "mongoose";
import AES from "crypto-js/aes";

const {
  Schema: {
    Types: { ObjectId }
  }
} = mongoose;
const messageSchema = new mongoose.Schema(
  {
    from: { type: ObjectId, required: true },
    conversationId: { type: ObjectId, required: true, index: true },
    timeSent: { type: Date, required: true },
    content: String,
    embed: String,
    image: String,
    video: String,
    audio: String,
    edited: Boolean,
    editedContent: String
  },
  {
    timestamps: true
  }
);

/**encrypt message with key from conversation */
messageSchema.methods.encryptMessage = async function(conversationKey) {
  const message = this;
  return AES.encrypt(message.content, conversationKey);
};

/**decrypt message with key from conversation */
messageSchema.methods.decryptMessage = async function(conversationKey) {
  const message = this;
  return AES.decrypt(message.content, conversationKey);
};

export default mongoose.model("Message", messageSchema);
