import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
  {
    content: {
      required: true,
      type: String,
    },
    createdBy: {
      ref: "User",
      required: true,
      type: Schema.Types.ObjectId,
    },
    project: {
      ref: "Project",
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true },
);

const NoteModel = mongoose.model("NoteModel", noteSchema);

export { NoteModel };
