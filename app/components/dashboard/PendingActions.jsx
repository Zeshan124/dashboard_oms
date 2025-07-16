"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export default function PendingActions({ actions }) {
  return (
    <Card className="border bg-white/80 dark:bg-zinc-900/80 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Pending Actions</CardTitle>
        <CardDescription>Items requiring your attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action) => (
            <div
              key={action.id}
              className={`flex items-center justify-between p-3 rounded-xl border-l-4 transition-all group shadow-sm border border-gray-100 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/60 hover:bg-blue-50/60 dark:hover:bg-zinc-800/60 hover:shadow-md ${
                action.status === "pending"
                  ? "border-l-yellow-400"
                  : action.status === "overdue"
                  ? "border-l-red-400"
                  : "border-l-blue-400"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-4 h-4 rounded-full shadow-md border border-white/40 dark:border-zinc-800/60 bg-gradient-to-br ${
                    action.status === "pending"
                      ? "from-yellow-300/80 to-yellow-500/80"
                      : action.status === "overdue"
                      ? "from-red-300/80 to-red-500/80"
                      : "from-blue-300/80 to-blue-500/80"
                  } group-hover:scale-110 transition-transform duration-300 backdrop-blur-[2px]`}
                ></div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {action.type}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {action.employee}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {action.date}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
