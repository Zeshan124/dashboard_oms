"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, FileText, BarChart3 } from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Employee Directory",
      description: "Manage employee profiles and information",
      icon: Users,
      iconColor: "text-blue-600"
    },
    {
      title: "Leave Management",
      description: "Track and approve time-off requests",
      icon: Calendar,
      iconColor: "text-green-600"
    },
    {
      title: "Payroll",
      description: "Process payroll and manage compensation",
      icon: FileText,
      iconColor: "text-purple-600"
    },
    {
      title: "Analytics",
      description: "View detailed HR reports and insights",
      icon: BarChart3,
      iconColor: "text-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <action.icon className={`w-8 h-8 ${action.iconColor} mx-auto mb-3`} />
            <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
            <p className="text-sm text-gray-600">{action.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}