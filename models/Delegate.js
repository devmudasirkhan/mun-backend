import mongoose from "mongoose";

const delegateSchema = new mongoose.Schema(
  {
    user: {
      type: Number,
      required: true,
      ref: "User",
    },

    priority_1: {
      type: String,
      required: true,
    },

    priority_2: {
      type: String,
      required: true,
    },

    priority_3: {
      type: String,
      required: true,
    },

    season: {
      type: Number,
      required: true,
      ref: "Season",
    },

    assigned_commitee: {
      type: String,
      default: null,
    },

    delegate_id: {
      type: String,
      required: true,
      unique: true,
    },

    country: {
      type: String,
      default: null,
    },

    member: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Delegate = mongoose.model("Delegate", delegateSchema);
export default Delegate;
