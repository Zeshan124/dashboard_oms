"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export default function PendingActions({ actions }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Pending Actions</CardTitle>
        <CardDescription>Items requiring your attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action) => (
            <div key={action.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  action.status === 'pending' ? 'bg-yellow-400' :
                  action.status === 'overdue' ? 'bg-red-400' :
                  'bg-blue-400'
                }`}></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{action.type}</p>
                  <p className="text-xs text-gray-600">{action.employee}</p>
                  <p className="text-xs text-gray-500">{action.date}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}