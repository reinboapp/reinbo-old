import mongoose from "mongoose";

const {
  Schema: {
    Types: { ObjectId }
  }
} = mongoose;
const chatSchema = new mongoose.Schema(
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

export default mongoose.model("Chat", chatSchema);
