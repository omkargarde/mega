import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    createdBy: {
      ref: "User",
      required: true,
      type: Schema.Types.ObjectId,
    },
    description: {
      type: String,
    },
    name: {
      required: true,
      trim: true,
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
);

const Project = mongoose.model("Project", projectSchema);

export { Project };
