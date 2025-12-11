import mongoose from "mongoose";

const seasonSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
    },

    month: {
      type: String,
      required: true,
    },

    startDate: {
      type: String,
      required: true,
    },

    endDate: {
      type: String,
      required: true,
    },

    earlyBirdDiscountPrice: {
      type: Number,
      required: true,
    },

    ticketPrice: {
      type: Number,
      required: true,
    },

    earlyBirdDeadline: {
      type: String,
      required: true,
    },

    registrationDeadline: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Season = mongoose.model("Season", seasonSchema);
export default Season;
