"use client";

import { Task, User } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  User as UserIcon,
  Pencil,
  Trash2,
  Timer,
  Calendar,
  Target,
} from "lucide-react";
import { useAuth, useTasks } from "@/lib/store";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

interface TaskCardProps {
  task: Task;
  assignee: User;
  _creator: User;
}

const priorityColors = {
  LOW: "bg-blue-500",
  MEDIUM: "bg-yellow-500",
  HIGH: "bg-orange-500",
  URGENT: "bg-red-500",
} as const;

const statusColors = {
  OPEN: "bg-gray-500",
  IN_PROGRESS: "bg-blue-500",
  PENDING_APPROVAL: "bg-yellow-500",
  CLOSED: "bg-green-500",
  REOPENED: "bg-red-500",
} as const;

const projectColors = {
  FRONTEND: "bg-purple-500",
  BACKEND: "bg-blue-500",
  MOBILE: "bg-green-500",
  DEVOPS: "bg-orange-500",
} as const;

export function TaskCard({ task, assignee }: TaskCardProps) {
  const user = useAuth((state) => state.user);
  const { updateTask, deleteTask, addTimeEntry } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggingTime, setIsLoggingTime] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStatusChange = (newStatus: Task["status"]) => {
    updateTask(task.id, { status: newStatus });
    toast.success("Task status updated");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id);
      toast.success("Task deleted");
    }
  };

  const handleEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const updates = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      priority: formData.get("priority") as Task["priority"],
      project: formData.get("project") as Task["project"],
      dueDate: formData.get("dueDate") as string,
      estimatedHours: parseInt(formData.get("estimatedHours") as string),
    };

    try {
      updateTask(task.id, updates);
      toast.success("Task updated");
      setIsEditing(false);
    } catch {
      toast.error("Failed to update task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogTime = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const duration = parseInt(formData.get("duration") as string);
    const description = formData.get("description") as string;

    try {
      addTimeEntry(task.id, {
        duration,
        description,
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
      });
      toast.success("Time logged successfully");
      setIsLoggingTime(false);
    } catch {
      toast.error("Failed to log time");
    } finally {
      setIsLoading(false);
    }
  };

  const totalTimeSpent = task.timeEntries.reduce(
    (total, entry) => total + entry.duration,
    0
  );

  const isOverdue =
    new Date(task.dueDate) < new Date() && task.status !== "CLOSED";

  if (!mounted) {
    return null;
  }

  return (
    <Card className={isOverdue ? "border-red-500" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{task.title}</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge className={priorityColors[task.priority]}>
              {task.priority.toLowerCase()}
            </Badge>
            <Badge className={projectColors[task.project]}>
              {task.project.toLowerCase()}
            </Badge>
            {user?.id === task.creatorId && (
              <>
                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Task</DialogTitle>
                      <DialogDescription>
                        Make changes to your task here.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEdit}>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            name="title"
                            defaultValue={task.title}
                            disabled={isLoading}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            name="description"
                            defaultValue={task.description}
                            disabled={isLoading}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="project">Project</Label>
                          <Select name="project" defaultValue={task.project}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select project" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="FRONTEND">Frontend</SelectItem>
                              <SelectItem value="BACKEND">Backend</SelectItem>
                              <SelectItem value="MOBILE">Mobile</SelectItem>
                              <SelectItem value="DEVOPS">DevOps</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="priority">Priority</Label>
                          <Select name="priority" defaultValue={task.priority}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="LOW">Low</SelectItem>
                              <SelectItem value="MEDIUM">Medium</SelectItem>
                              <SelectItem value="HIGH">High</SelectItem>
                              <SelectItem value="URGENT">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="dueDate">Due Date</Label>
                          <Input
                            id="dueDate"
                            name="dueDate"
                            type="date"
                            defaultValue={task.dueDate.split("T")[0]}
                            disabled={isLoading}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="estimatedHours">
                            Estimated Hours
                          </Label>
                          <Input
                            id="estimatedHours"
                            name="estimatedHours"
                            type="number"
                            min="1"
                            defaultValue={task.estimatedHours}
                            disabled={isLoading}
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? "Saving..." : "Save changes"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button variant="ghost" size="icon" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{task.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <UserIcon className="mr-1 h-4 w-4" />
            {assignee.name}
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {new Date(task.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <Timer className="mr-1 h-4 w-4" />
            {Math.floor(totalTimeSpent / 60)}h {totalTimeSpent % 60}m
          </div>
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            {new Date(task.dueDate).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <Target className="mr-1 h-4 w-4" />
            {task.estimatedHours}h estimated
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <Badge className={statusColors[task.status]}>
            {task.status.toLowerCase().replace("_", " ")}
          </Badge>
          <div className="space-x-2">
            {user?.role === "MANAGER" && task.status === "PENDING_APPROVAL" && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange("CLOSED")}
                >
                  Approve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange("REOPENED")}
                >
                  Reopen
                </Button>
              </>
            )}
            {user?.role === "DEVELOPER" &&
              user.id === task.assigneeId &&
              task.status === "OPEN" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange("IN_PROGRESS")}
                >
                  Start Work
                </Button>
              )}
            {user?.role === "DEVELOPER" &&
              user.id === task.assigneeId &&
              task.status === "IN_PROGRESS" && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange("PENDING_APPROVAL")}
                  >
                    Mark as Complete
                  </Button>
                  <Dialog open={isLoggingTime} onOpenChange={setIsLoggingTime}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Log Time
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Log Time</DialogTitle>
                        <DialogDescription>
                          Record the time spent on this task.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleLogTime}>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="duration">Duration (minutes)</Label>
                            <Input
                              id="duration"
                              name="duration"
                              type="number"
                              min="1"
                              disabled={isLoading}
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              name="description"
                              placeholder="What did you work on?"
                              disabled={isLoading}
                              required
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Logging..." : "Log Time"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </>
              )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
