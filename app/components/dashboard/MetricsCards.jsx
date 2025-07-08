"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, UserPlus, Clock, Briefcase, TrendingUp, TrendingDown, Target } from "lucide-react";

export default function MetricsCards({ hrStats }) {
  const metrics = [
    {
      title: "Total Employees",
      value: hrStats.totalEmployees.toLocaleString(),
      change: "+2.5% from last month",
      changeType: "positive",
      icon: Users,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "New Hires",
      value: hrStats.newHires,
      change: "+18% from last month",
      changeType: "positive",
      icon: UserPlus,
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      title: "Attendance Rate",
      value: `${hrStats.attendanceRate}%`,
      change: "-1.2% from last month",
      changeType: "negative",
      icon: Clock,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    {
      title: "Open Positions",
      value: hrStats.openPositions,
      change: "5 urgent positions",
      changeType: "neutral",
      icon: Briefcase,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                <p className={`text-sm flex items-center mt-1 ${
                  metric.changeType === 'positive' ? 'text-green-600' :
                  metric.changeType === 'negative' ? 'text-red-600' :
                  'text-blue-600'
                }`}>
                  {metric.changeType === 'positive' ? <TrendingUp className="w-4 h-4 mr-1" /> :
                   metric.changeType === 'negative' ? <TrendingDown className="w-4 h-4 mr-1" /> :
                   <Target className="w-4 h-4 mr-1" />}
                  {metric.change}
                </p>
              </div>
              <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                <metric.icon className={`w-6 h-6 ${metric.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}