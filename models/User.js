import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    userType: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    institution: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    rollNumber: {
      type: String,
      required: true,
    },

    id_card: {
      type: String,
      default: "",
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
