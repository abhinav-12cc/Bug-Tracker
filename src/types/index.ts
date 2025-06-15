export type Role = "DEVELOPER" | "MANAGER";
export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type Status =
  | "OPEN"
  | "IN_PROGRESS"
  | "PENDING_APPROVAL"
  | "CLOSED"
  | "REOPENED";
export type Project = "FRONTEND" | "BACKEND" | "MOBILE" | "DEVOPS";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface TimeEntry {
  id: string;
  taskId: string;
  userId: string;
  duration: number; // in minutes
  description: string;
  startTime: string;
  endTime: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  project: Project;
  assigneeId: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  estimatedHours: number;
  timeEntries: TimeEntry[];
}
