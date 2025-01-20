import { TaskStatus } from "@prisma/client";

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  PAUSED: "Paused",
};

export const userKeys = ["Id", "Email", "First Name", "Last Name"];
