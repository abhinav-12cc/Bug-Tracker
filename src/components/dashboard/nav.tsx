"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/store";

import { Bug, LayoutDashboard, Clock, Users, LogOut } from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Tasks",
    icon: Bug,
    href: "/dashboard/tasks",
    color: "text-violet-500",
  },
  {
    label: "Time Tracking",
    icon: Clock,
    href: "/dashboard/time-tracking",
    color: "text-pink-700",
  },
  {
    label: "Team",
    icon: Users,
    href: "/dashboard/team",
    color: "text-orange-700",
  },
];

export function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuth((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition",
                pathname === route.href
                  ? "text-sky-700 bg-sky-100"
                  : "text-zinc-700 hover:text-sky-900 hover:bg-sky-50"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-zinc-700 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
}
