const taskStatusEnum = {
  DONE: "done",
  IN_PROGRESS: "in_progress",
  TODO: "todo",
} as const;

const AvailableTaskStatuses = Object.values(taskStatusEnum);

export { AvailableTaskStatuses, taskStatusEnum };
