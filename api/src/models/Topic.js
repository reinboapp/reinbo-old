import mongoose from "mongoose";

const {
  Schema: {
    Types: { ObjectId }
  }
} = mongoose;

const topicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    conversationId: { type: ObjectId, required: true, index: true },
    members: [{ type: ObjectId }],

    publicKey: { type: String, required: true },
    isSecret: { type: Boolean, required: true, default: false }
  },
  {
    timestamps: true
  }
);

topicSchema.methods.generatePublicKey = async function() {};

export default mongoose.model("Topic", topicSchema);
