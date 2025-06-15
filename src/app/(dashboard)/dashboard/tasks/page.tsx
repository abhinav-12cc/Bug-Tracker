import { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { TaskList } from "@/components/tasks/task-list";
import { CreateTaskButton } from "@/components/tasks/create-task-button";

export const metadata: Metadata = {
  title: "Tasks",
  description: "Manage your tasks and bugs.",
};

export default function TasksPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Tasks" text="Create and manage your tasks.">
        <CreateTaskButton />
      </DashboardHeader>
      <div className="grid gap-4">
        <TaskList />
      </div>
    </DashboardShell>
  );
}
