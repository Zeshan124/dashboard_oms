"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  UserPlus,
  Clock,
  Briefcase,
  TrendingUp,
  TrendingDown,
  Target,
} from "lucide-react";

export default function MetricsCards({ hrStats }) {
  const metrics = [
    {
      title: "Total Employees",
      value: hrStats.totalEmployees.toLocaleString(),
      change: "+2.5% from last month",
      changeType: "positive",
      icon: Users,
      iconGradient: "from-blue-400/80 to-blue-600/80",
    },
    {
      title: "New Hires",
      value: hrStats.newHires,
      change: "+18% from last month",
      changeType: "positive",
      icon: UserPlus,
      iconGradient: "from-green-400/80 to-green-600/80",
    },
    {
      title: "Attendance Rate",
      value: `${hrStats.attendanceRate}%`,
      change: "-1.2% from last month",
      changeType: "negative",
      icon: Clock,
      iconGradient: "from-yellow-300/80 to-yellow-500/80",
    },
    {
      title: "Open Positions",
      value: hrStats.openPositions,
      change: "5 urgent positions",
      changeType: "neutral",
      icon: Briefcase,
      iconGradient: "from-purple-400/80 to-purple-600/80",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className="border bg-white/80 dark:bg-zinc-900/80 shadow-lg rounded-2xl transition-transform hover:scale-[1.025] hover:shadow-xl group"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide">
                  {metric.title}
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    {metric.value}
                  </span>
                </div>
                <div className="h-[1.5px] w-10 bg-gradient-to-r from-gray-200 to-gray-400 dark:from-zinc-700 dark:to-zinc-800 my-2 rounded-full" />
                <p
                  className={`text-sm flex items-center gap-1 mt-1 font-medium ${
                    metric.changeType === "positive"
                      ? "text-green-600 dark:text-green-400"
                      : metric.changeType === "negative"
                      ? "text-red-600 dark:text-red-400"
                      : "text-blue-600 dark:text-blue-400"
                  }`}
                >
                  {metric.changeType === "positive" ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : metric.changeType === "negative" ? (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  ) : (
                    <Target className="w-4 h-4 mr-1" />
                  )}
                  {metric.change}
                </p>
              </div>
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${metric.iconGradient} shadow-md group-hover:scale-110 transition-transform duration-300 border border-white/30 dark:border-zinc-800/60 backdrop-blur-[2px]`}
                style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)" }}
              >
                <metric.icon className="w-7 h-7 text-white drop-shadow" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}