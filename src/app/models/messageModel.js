const mongoose = require("mongoose");

const messsageSchema = new mongoose.Schema(
  {
    text: {
        type: String,
        required: true,
        trim: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

messsageSchema.index({ sender: 1, recipient: 1 });
module.exports = mongoose.model("Message", messsageSchema);
