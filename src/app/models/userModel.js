const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { EMAIL_REGEX } = require("../utils/const");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      validate: {
        validator: function (str) {
          return EMAIL_REGEX.test(str);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.JWT_PRIVATE_KEY
  );
};

module.exports = mongoose.model("User", userSchema);
