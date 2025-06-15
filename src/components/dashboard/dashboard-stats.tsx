"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTasks } from "@/lib/store";
import { useAuth } from "@/lib/store";
import { Task, Status } from "@/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

export function DashboardStats() {
  const tasks = useTasks((state) => state.tasks);
  const user = useAuth((state) => state.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredTasks =
    user?.role === "MANAGER"
      ? tasks
      : tasks.filter((task) => task.assigneeId === user?.id);

  const stats = {
    total: filteredTasks.length,
    open: filteredTasks.filter((t) => t.status === "OPEN").length,
    inProgress: filteredTasks.filter((t) => t.status === "IN_PROGRESS").length,
    pendingApproval: filteredTasks.filter(
      (t) => t.status === "PENDING_APPROVAL"
    ).length,
    closed: filteredTasks.filter((t) => t.status === "CLOSED").length,
  };

  const timeStats = {
    totalTimeSpent: filteredTasks.reduce(
      (total, task) =>
        total +
        task.timeEntries.reduce((sum, entry) => sum + entry.duration, 0),
      0
    ),
    averageTimePerTask:
      filteredTasks.length > 0
        ? filteredTasks.reduce(
            (total, task) =>
              total +
              task.timeEntries.reduce((sum, entry) => sum + entry.duration, 0),
            0
          ) / filteredTasks.length
        : 0,
  };

  const generateTrendData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    }).reverse();

    return last7Days.map((date) => {
      const tasksForDay = filteredTasks.filter((task) => {
        const taskDate = new Date(task.createdAt).toISOString().split("T")[0];
        return taskDate === date;
      });

      return {
        date: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        tasks: tasksForDay.length,
        timeSpent:
          tasksForDay.reduce(
            (total, task) =>
              total +
              task.timeEntries.reduce((sum, entry) => sum + entry.duration, 0),
            0
          ) / 60,
      };
    });
  };

  const trendData = generateTrendData();

  if (!mounted) {
    return null;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-xs text-muted-foreground">
            {stats.open} open, {stats.inProgress} in progress
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Approval
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pendingApproval}</div>
          <div className="text-xs text-muted-foreground">
            Awaiting manager review
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Time Spent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Math.floor(timeStats.totalTimeSpent / 60)}h{" "}
            {timeStats.totalTimeSpent % 60}m
          </div>
          <div className="text-xs text-muted-foreground">
            {Math.round(timeStats.averageTimePerTask / 60)}h avg per task
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.total > 0
              ? Math.round((stats.closed / stats.total) * 100)
              : 0}
            %
          </div>
          <div className="text-xs text-muted-foreground">
            {stats.closed} tasks completed
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Task Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar
                  yAxisId="left"
                  dataKey="tasks"
                  fill="#8884d8"
                  name="Tasks Created"
                />
                <Bar
                  yAxisId="right"
                  dataKey="timeSpent"
                  fill="#82ca9d"
                  name="Hours Spent"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
