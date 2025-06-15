"use client";

import { useTasks } from "@/lib/store";
import { useAuth } from "@/lib/store";
import { TaskCard } from "@/components/tasks/task-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Priority, Status, User } from "@/types";

export function TaskList() {
  const tasks = useTasks((state) => state.tasks);
  const users = useTasks((state) => state.users as User[]);
  const user = useAuth((state) => state.user);
  const [mounted, setMounted] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("created");

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredTasks = tasks
    .filter((task) => {
      if (statusFilter === "all") return true;
      return task.status === statusFilter;
    })
    .filter((task) => {
      if (priorityFilter === "all") return true;
      return task.priority === priorityFilter;
    })
    .sort((a, b) => {
      if (sortBy === "created") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      if (sortBy === "priority") {
        const priorityOrder = { URGENT: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="OPEN">Open</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="PENDING_APPROVAL">Pending Approval</SelectItem>
            <SelectItem value="CLOSED">Closed</SelectItem>
            <SelectItem value="REOPENED">Reopened</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="URGENT">Urgent</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="LOW">Low</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created">Created Date</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => {
            setStatusFilter("all");
            setPriorityFilter("all");
            setSortBy("created");
          }}
        >
          Clear Filters
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredTasks.map((task) => {
          const assignee = users.find((u: User) => u.id === task.assigneeId);
          const creator = users.find((u: User) => u.id === task.creatorId);
          if (!assignee || !creator) return null;
          return (
            <TaskCard
              key={task.id}
              task={task}
              assignee={assignee}
              creator={creator}
            />
          );
        })}
      </div>
    </div>
  );
}
