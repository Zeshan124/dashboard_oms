"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

export default function DepartmentOverview({ departmentData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Department Overview</CardTitle>
        <CardDescription>Employee distribution across departments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {departmentData.map((dept, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  index % 6 === 0 ? 'bg-blue-100' :
                  index % 6 === 1 ? 'bg-green-100' :
                  index % 6 === 2 ? 'bg-purple-100' :
                  index % 6 === 3 ? 'bg-yellow-100' :
                  index % 6 === 4 ? 'bg-red-100' :
                  'bg-indigo-100'
                }`}>
                  <Users className={`w-5 h-5 ${
                    index % 6 === 0 ? 'text-blue-600' :
                    index % 6 === 1 ? 'text-green-600' :
                    index % 6 === 2 ? 'text-purple-600' :
                    index % 6 === 3 ? 'text-yellow-600' :
                    index % 6 === 4 ? 'text-red-600' :
                    'text-indigo-600'
                  }`} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{dept.name}</h4>
                  <p className="text-sm text-gray-600">{dept.employees} employees</p>
                </div>
              </div>
              <Badge variant={dept.growth.startsWith('+') ? 'default' : 'destructive'}>
                {dept.growth}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}