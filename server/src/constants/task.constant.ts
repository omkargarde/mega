const taskStatusEnum = {
  doesNotMatch: "done",
  InProgress: "in_progress",
  Todo: "todo",
} as const;

const AvailableTaskStatuses = Object.values(taskStatusEnum);

export { AvailableTaskStatuses, taskStatusEnum };
