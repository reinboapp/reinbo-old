import mongoose from "mongoose";

const { Schema } = mongoose;
const chatSchema = new Schema({
  userId: Schema.Types.ObjectId,
  text: String
});

export default mongoose.model("Chat", chatSchema);
