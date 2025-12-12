import mongoose from "mongoose";

const delegateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true,
    },

    priority_1: { type: String, required: true },
    priority_2: { type: String, required: true },
    priority_3: { type: String, required: true },

    season: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Season",
      required: true,
    },

    assigned_commitee: { type: String, default: null },
    country: { type: String, default: null },
    member: { type: String, default: null },

    delegate_id: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Delegate = mongoose.model("Delegate", delegateSchema);
export default Delegate;
