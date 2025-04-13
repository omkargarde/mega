import { asyncHandler } from "../utils/async-handler.util.ts"

const getProjects = asyncHandler (req, res) => {
  // get all projects
};

const getProjectById = asyncHandler (req, res) => {
  // get project by id
};

const createProject = asyncHandler (req, res) => {
  // create project
};

const updateProject = asyncHandler (req, res) => {
  // update project
};

const deleteProject = asyncHandler (req, res) => {
  // delete project
};

const getProjectMembers = asyncHandler (req, res) => {
  // get project members
};

const addMemberToProject = asyncHandler (req, res) => {
  // add member to project
};

const deleteMember = asyncHandler (req, res) => {
  // delete member from project
};

const updateMemberRole = asyncHandler (req, res) => {
  // update member role
};

export {
  addMemberToProject,
  createProject,
  deleteMember,
  deleteProject,
  getProjectById,
  getProjectMembers,
  getProjects,
  updateMemberRole,
  updateProject,
};
