"use client";
import { useTasks } from "@/lib/store";
import { useAuth } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { User } from "@/types";

function stringToInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function TimeTrackingPage() {
  const tasks = useTasks((state) => state.tasks);
  const users = useTasks((state) => state.users);
  const user = useAuth((state) => state.user);

  // Filter tasks based on user role
  const visibleTasks =
    user?.role === "MANAGER"
      ? tasks
      : tasks.filter((task) => task.assigneeId === user?.id);

  // Helper to get user name
  const getUser = (id: string) => users.find((u: User) => u.id === id);

  return (
    <div className="max-w-5xl mx-auto py-8">
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-2 border-b">
          <CardTitle className="text-2xl font-bold">Time Tracking</CardTitle>
          <p className="text-muted-foreground text-base mt-1">
            {user?.role === "MANAGER"
              ? "View time spent by all developers on each task."
              : "View your time spent on each task."}
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-700 text-left">
                  <th className="py-3 px-4 font-semibold">Task</th>
                  <th className="py-3 px-4 font-semibold">Assignee</th>
                  <th className="py-3 px-4 font-semibold">Total Time Spent</th>
                  <th className="py-3 px-4 font-semibold">Time Entries</th>
                </tr>
              </thead>
              <tbody>
                {visibleTasks.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No tasks found.
                    </td>
                  </tr>
                )}
                {visibleTasks.map((task) => {
                  const assignee = getUser(task.assigneeId);
                  const totalTime = task.timeEntries.reduce(
                    (sum, entry) => sum + entry.duration,
                    0
                  );
                  return (
                    <tr key={task.id} className="hover:bg-gray-100 transition">
                      <td className="py-3 px-4 font-medium">
                        <div className="flex flex-col">
                          <span className="text-base font-semibold text-gray-900">
                            {task.title}
                          </span>
                          <span className="text-xs text-gray-500">
                            {task.description}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {assignee ? (
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                              {stringToInitials(assignee.name)}
                            </div>
                            <span className="font-medium text-gray-800">
                              {assignee.name}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Unknown</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-gray-900">
                          {Math.floor(totalTime / 60)}h {totalTime % 60}m
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {task.timeEntries.length === 0 ? (
                          <span className="text-muted-foreground">
                            No entries
                          </span>
                        ) : (
                          <ul className="space-y-2">
                            {task.timeEntries.map((entry) => {
                              const entryUser = getUser(entry.userId);
                              return (
                                <li
                                  key={entry.id}
                                  className="flex items-center gap-2 border-b last:border-b-0 pb-1 last:pb-0"
                                >
                                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-700">
                                    {entryUser
                                      ? stringToInitials(entryUser.name)
                                      : "?"}
                                  </div>
                                  <span className="font-semibold text-gray-800">
                                    {entryUser ? entryUser.name : "Unknown"}
                                  </span>
                                  <span className="ml-2 text-gray-600">
                                    {Math.floor(entry.duration / 60)}h{" "}
                                    {entry.duration % 60}m
                                  </span>
                                  <span className="ml-2 text-xs text-gray-400">
                                    (
                                    {new Date(
                                      entry.startTime
                                    ).toLocaleDateString()}{" "}
                                    - {entry.description})
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
