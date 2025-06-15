"use client";
import { useTasks } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@/types";

function stringToInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function TeamPage() {
  const users = useTasks((state) => state.users);

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user: User) => (
          <Card
            key={user.id}
            className="shadow-md border-0 hover:shadow-lg transition"
          >
            <CardContent className="flex flex-col items-center py-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-700 mb-3">
                {stringToInitials(user.name)}
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {user.name}
              </div>
              <div className="text-sm text-gray-500 mb-1">{user.email}</div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium mt-2 ${user.role === "MANAGER" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
              >
                {user.role.charAt(0) + user.role.slice(1).toLowerCase()}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
