export const taskStatusEnum = {
  DONE: "done",
  IN_PROGRESS: "in_progress",
  TODO: "todo",
} as const;

export const AvailableTaskStatuses = Object.values(taskStatusEnum);
