import { asyncHandler } from "../utils/async-handler.util.ts"

// get all tasks
const getTasks = asyncHandler (req, res) => {
  // get all tasks
};

// get task by id
const getTaskById = asyncHandler (req, res) => {
  // get task by id
};

// create task
const createTask = asyncHandler (req, res) => {
  // create task
};

// update task
const updateTask = asyncHandler (req, res) => {
  // update task
};

// delete task
const deleteTask = asyncHandler (req, res) => {
  // delete task
};

// create subtask
const createSubTask = asyncHandler (req, res) => {
  // create subtask
};

// update subtask
const updateSubTask = asyncHandler (req, res) => {
  // update subtask
};

// delete subtask
const deleteSubTask = asyncHandler (req, res) => {
  // delete subtask
};

export {
  createSubTask,
  createTask,
  deleteSubTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateSubTask,
  updateTask,
};
