import { User, Task, TimeEntry, Project } from "../types";

export const users: User[] = [
  {
    id: "1",
    name: "Abhinav Srivastava",
    email: "abhinavsrivastava103@gmail.com",
    password: "Abhinik123@",
    role: "DEVELOPER",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "manager@example.com",
    password: "manager123",
    role: "MANAGER",
  },
  {
    id: "3",
    name: "Harsh Srivastava",
    email: "harshsrivastava621@gmail.com",
    password: "Luvyou123@",
    role: "DEVELOPER",
  },
  {
    id: "4",
    name: "Ratan Kumar Singh",
    email: "ratankumarsingh@gmail.com",
    password: "Test@123",
    role: "DEVELOPER",
  },
];

export const tasks: Task[] = [
  {
    id: "1",
    title: "Fix login page bug",
    description: "The login button is not working on mobile devices",
    status: "OPEN",
    priority: "HIGH",
    project: "FRONTEND",
    assigneeId: "1",
    creatorId: "2",
    createdAt: "2024-06-01T10:00:00.000Z",
    updatedAt: "2024-06-01T10:00:00.000Z",
    dueDate: "2024-06-08T10:00:00.000Z",
    estimatedHours: 4,
    timeEntries: [
      {
        id: "1",
        taskId: "1",
        userId: "1",
        duration: 120,
        description: "Initial investigation",
        startTime: "2024-06-01T09:00:00.000Z",
        endTime: "2024-06-01T09:30:00.000Z",
      },
    ],
  },
  {
    id: "2",
    title: "Update documentation",
    description: "Update API documentation with new endpoints",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    project: "BACKEND",
    assigneeId: "1",
    creatorId: "2",
    createdAt: "2024-06-02T11:00:00.000Z",
    updatedAt: "2024-06-02T11:00:00.000Z",
    dueDate: "2024-06-05T10:00:00.000Z",
    estimatedHours: 2,
    timeEntries: [],
  },
];
