"use client";

import { Button } from "@/components/ui/button";
import { UserPlus, Bell, ChevronDown } from "lucide-react";

export default function Header({ user, selectedPeriod, setSelectedPeriod }) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">HR Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}!</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Period Selector */}
          <div className="relative">
            <Button variant="outline" className="flex items-center space-x-2">
              <span>{selectedPeriod}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Quick Actions */}
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
          
          {/* Notifications */}
          <Button variant="outline" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
        </div>
      </div>
    </div>
  );
}