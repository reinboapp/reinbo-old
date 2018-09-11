import mongoose from "mongoose";

const {
  Schema: {
    Types: { ObjectId }
  }
} = mongoose;

const conversationSchema = new mongoose.Schema(
  {
    name: { type: String },
    conversationName: { type: String, required: true, unique: true }, // behavior is like username
    description: String,

    owner: { type: ObjectId, ref: "User" },
    moderators: [{ type: ObjectId, ref: "User" }], // or admin
    members: [{ type: ObjectId, ref: "User" }],

    isPublic: { type: Boolean, default: false, required: true },
    isGroup: { type: Boolean, default: false, required: true }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Conversation", conversationSchema);
