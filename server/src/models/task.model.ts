import mongoose, { Schema } from "mongoose";

import {
  AvailableTaskStatuses,
  taskStatusEnum,
} from "../constants/task.constant.ts";

const taskSchema = new Schema(
  {
    assignedBy: {
      ref: "User",
      required: true,
      type: Schema.Types.ObjectId,
    },
    assignedTo: {
      ref: "User",
      required: true,
      type: Schema.Types.ObjectId,
    },
    attachments: {
      default: [],
      type: [{ mimeType: String, size: Number, url: String }],
    },
    description: {
      type: String,
    },
    project: {
      ref: "Project",
      required: true,
      type: Schema.Types.ObjectId,
    },
    status: {
      default: taskStatusEnum.TODO,
      enum: AvailableTaskStatuses,
      type: String,
    },
    title: {
      required: true,
      trim: true,
      type: String,
    },
  },
  { timestamps: true },
);

const TaskModel = mongoose.model("TaskModel", taskSchema);

export { TaskModel };
