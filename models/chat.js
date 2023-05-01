const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    message: { type: String, required: true, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
