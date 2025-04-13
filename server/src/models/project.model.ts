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

const ProjectModel = mongoose.model("ProjectModel", projectSchema);

export { ProjectModel };
