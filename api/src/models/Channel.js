import mongoose from "mongoose";

const { PUBLIC, PRIVATE, SECRET } = constants;

const {
  Schema: {
    Types: { ObjectId }
  }
} = mongoose;

const channelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    conversationId: { type: ObjectId, required: true, index: true },
    members: [{ type: ObjectId }],

    publicKey: { type: String, required: true },
    privacyType: {
      type: String,
      enum: [PUBLIC, PRIVATE, SECRET],
      required: true
    }
  },
  {
    timestamps: true
  }
);

channelSchema.methods.generatePublicKey = async function() {};

export default mongoose.model("Channel", channelSchema);
