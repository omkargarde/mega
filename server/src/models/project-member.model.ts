import mongoose, { Schema } from "mongoose";

import {
  AvailableUserRoles,
  userRolesEnum,
} from "../constants/user.constant.ts";

const projectMemberSchema = new Schema(
  {
    project: {
      ref: "Project",
      required: true,
      type: Schema.Types.ObjectId,
    },
    role: {
      default: userRolesEnum.MEMBER,
      enum: AvailableUserRoles,
      type: String,
    },
    user: {
      ref: "User",
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true },
);

const ProjectMemberModel = mongoose.model(
  "ProjectMemberModel",
  projectMemberSchema,
);

export { ProjectMemberModel };
