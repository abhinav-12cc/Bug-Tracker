"use client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { TaskList } from "@/components/tasks/task-list";
import { CreateTaskButton } from "@/components/tasks/create-task-button";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { useAuth } from "@/lib/store";

export default function DashboardPage() {
  const user = useAuth((state) => state.user);
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="View and manage your tasks">
        {user?.role === "MANAGER" && <CreateTaskButton />}
      </DashboardHeader>
      <div className="grid gap-8">
        <DashboardStats />
        <TaskList />
      </div>
    </DashboardShell>
  );
}
