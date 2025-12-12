import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
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

    phoneNumber: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      // unique: true,
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
      required: true,
    },

    priority_1: {
      type: String,
      default: "",
      required: true,
    },

    priority_2: {
      type: String,
      default: "",
      required: true,
    },

    priority_3: {
      type: String,
      default: "",
      required: true,
    },

    priority_4: {
      type: String,
      default: "",
    },

    season: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Season",
      required: true,
    },

    payment_proof: {
      type: String,
      default: "",
      required: true,
    },

    status: {
      type: String,
      enum: ["Accepted", "Pending", "Rejected"],
      default: "Pending",
    },

    status_code: {
      type: String,
      enum: ["ACCEPTED", "PENDING", "REJECTED"],
      default: "PENDING",
    },

    rejection_reason: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;
