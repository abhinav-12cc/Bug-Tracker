import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task, User, TimeEntry } from "@/types";
import { users as initialUsers, tasks as initialTasks } from "./mock-data";

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

interface TaskState {
  tasks: Task[];
  users: User[];
  addTask: (
    task: Omit<Task, "id" | "createdAt" | "updatedAt" | "timeEntries">
  ) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addTimeEntry: (
    taskId: string,
    timeEntry: Omit<TimeEntry, "id" | "taskId" | "userId">
  ) => void;
  updateTimeEntry: (
    taskId: string,
    timeEntryId: string,
    updates: Partial<TimeEntry>
  ) => void;
  deleteTimeEntry: (taskId: string, timeEntryId: string) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (email: string, password: string) => {
        const user = initialUsers.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          set({ user });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export const useTasks = create<TaskState>()(
  persist(
    (set) => ({
      tasks: initialTasks,
      users: initialUsers,
      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: Math.random().toString(36).substr(2, 9),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              timeEntries: [],
            },
          ],
        })),
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              : task
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      addTimeEntry: (taskId, timeEntry) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  timeEntries: [
                    ...task.timeEntries,
                    {
                      ...timeEntry,
                      id: Math.random().toString(36).substr(2, 9),
                      taskId,
                      userId: state.users[0].id, // For demo purposes, always use the first user
                    },
                  ],
                }
              : task
          ),
        })),
      updateTimeEntry: (taskId, timeEntryId, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  timeEntries: task.timeEntries.map((entry) =>
                    entry.id === timeEntryId ? { ...entry, ...updates } : entry
                  ),
                }
              : task
          ),
        })),
      deleteTimeEntry: (taskId, timeEntryId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  timeEntries: task.timeEntries.filter(
                    (entry) => entry.id !== timeEntryId
                  ),
                }
              : task
          ),
        })),
    }),
    {
      name: "tasks-storage",
    }
  )
);
