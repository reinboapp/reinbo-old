import mongoose from "mongoose";
import constants from "./constants";

const { PUBLIC, PRIVATE, GROUP, SECRET } = constants;

const {
  Schema: {
    Types: { ObjectId }
  }
} = mongoose;
const conversationSchema = new mongoose.Schema(
  {
    name: { type: String },
    channels: [{ type: String, required: true }],
    conversationId: { type: String, required: true },
    members: [{ type: ObjectId, required: true }],
    owner: { type: ObjectId, required: true },
    publicKey: { type: String, required: true },
    privacyType: {
      type: String,
      required: true,
      enum: [PUBLIC, PRIVATE, SECRET]
    },
    sizeType: {
      type: String,
      required: true,
      enum: [GROUP, PRIVATE, SECRET]
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Conversation", conversationSchema);
