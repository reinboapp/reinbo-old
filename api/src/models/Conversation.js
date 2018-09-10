import mongoose from "mongoose";
import constants from "./constants";

const { PUBLIC, PRIVATE, SECRET, GROUP, TWO, ONE } = constants;

const {
  Schema: {
    Types: { ObjectId }
  }
} = mongoose;

const conversationSchema = new mongoose.Schema(
  {
    name: { type: String },
    conversationName: { type: String, required: true, index: true }, // behavior is like username
    owner: { type: ObjectId },
    moderators: [{ type: ObjectId }], // or admin

    sizeType: {
      type: String,
      required: true,
      enum: [GROUP, TWO, ONE]
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Conversation", conversationSchema);
