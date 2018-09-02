import mongoose from "mongoose";

const {
  Schema: {
    Types: { ObjectId }
  }
} = mongoose;
const chatSchema = new mongoose.Schema(
  {
    name: { type: String },
    owner: { type: ObjectId, required: true},
    member: [{ type: ObjectId, required: true }],
    publicKey: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Chat", chatSchema);
