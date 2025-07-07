"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, GraduationCap, Award, Zap } from "lucide-react";

export default function QuickAnalytics({ hrStats }) {
  const analytics = [
    {
      title: "AVG SALARY",
      value: `$${hrStats.avgSalary.toLocaleString()}`,
      subtitle: "+5.2% vs last year",
      icon: DollarSign,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      textColor: "text-blue-600"
    },
    {
      title: "TRAINING",
      value: `${hrStats.trainingCompletion}%`,
      subtitle: "Completion rate",
      icon: GraduationCap,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      textColor: "text-green-600"
    },
    {
      title: "SATISFACTION",
      value: `${hrStats.employeeSatisfaction}/5`,
      subtitle: "Employee rating",
      icon: Award,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      textColor: "text-purple-600"
    },
    {
      title: "TURNOVER",
      value: "4.2%",
      subtitle: "Annual rate",
      icon: Zap,
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
      textColor: "text-yellow-600"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Analytics</CardTitle>
        <CardDescription>Key performance indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {analytics.map((item, index) => (
            <div key={index} className={`p-4 ${item.bgColor} rounded-lg`}>
              <div className="flex items-center justify-between mb-2">
                <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                <span className={`text-xs ${item.textColor} font-medium`}>{item.title}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              <p className="text-xs text-gray-600">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
