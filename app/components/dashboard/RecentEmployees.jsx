"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function RecentEmployees({ employees }) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">
              Recent Employees
            </CardTitle>
            <CardDescription>Newly hired team members</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={employee.avatar} />
                  <AvatarFallback>
                    {employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-gray-900">{employee.name}</h4>
                  <p className="text-sm text-gray-600">{employee.position}</p>
                  <p className="text-xs text-gray-500">{employee.department}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="mb-1">
                  {employee.status}
                </Badge>
                <p className="text-xs text-gray-500">{employee.joinDate}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}