// boilerplate code

import { asyncHandler } from "../utils/async-handler.util.ts";

const getNotes = asyncHandler (req, res) => {
  // get all notes
};

const getNoteById = asyncHandler (req, res) => {
  // get note by id
};

const createNote = asyncHandler (req, res) => {
  // create note
};

const updateNote = asyncHandler (req, res) => {
  // update note
};

const deleteNote = asyncHandler (req, res) => {
  // delete note
};

export { createNote, deleteNote, getNoteById, getNotes, updateNote };
