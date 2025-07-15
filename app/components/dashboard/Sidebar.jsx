"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  UserPlus,
  FileText,
  Calendar,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Menu,
  X,
  BarChart3,
  Building2,
  Star,
  Bell,
  Search,
  Shield,
  Sparkles,
  TrendingUp,
  CalendarDays,
  CreditCard,
  Target,
  BookOpen,
  AlertCircle,
} from "lucide-react";

export default function Sidebar({
  user,
  role,
  branchName,
  onSignOut,
  activeComponent,
  setActiveComponent,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState("employees"); // Default to employees for demo

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      path: "/dashboard",
      badge: null,
      componentId: "dashboard", // Add componentId for mapping
    },
    {
      id: "employees",
      label: "Employees",
      icon: Users,
      path: "/employees",
      badge: "1,247",
      subItems: [
        {
          id: "all-employees",
          label: "All Employees",
          path: "/employees",
          componentId: "all-employees",
        },
        {
          id: "add-employee",
          label: "Add Employee",
          path: "/employees",
          componentId: "add-employee",
        },
        // {
        //   id: "employee-profiles",
        //   label: "Profiles",
        //   path: "/employees/profiles",
        //   componentId: "employee-profiles",
        // },
        // {
        //   id: "org-chart",
        //   label: "Organization Chart",
        //   path: "/employees/org-chart",
        //   componentId: "org-chart",
        // },
      ],
    },
    {
      id: "payroll",
      label: "Payroll",
      icon: CreditCard,
      path: "/payroll",
      badge: null,
      subItems: [
        {
          id: "payroll",
          label: "Payroll",
          path: "/payrolls",
          componentId: "payroll",
        },
        // {
        //   id: "payroll-processing",
        //   label: "Payroll Processing",
        //   path: "/payroll/processing",
        // },
        // { id: "tax-management", label: "Tax Management", path: "/payroll/tax" },
        // { id: "payslips", label: "Payslips", path: "/payroll/payslips" },
      ],
    },
    {
      id: "leavemanagement",
      label: "Leave Management",
      icon: CreditCard,
      path: "/leavemanagement",
      badge: null,
      subItems: [
        {
          id: "leavemanagement",
          label: "Leaves",
          path: "/leavemanagement",
          componentId: "leavemanagement", // Component ID referencing your LeaveManagement.jsx
        },
      ],
    },
    {
      id: "complaint",
      label: "Complaint",
      icon: AlertCircle,
      path: "/complaint",
      badge: null,
      subItems: [
        {
          id: "complaint",
          label: "Complaint",
          path: "/complaint",
          componentId: "complaint",
        },
      ],
    },
    // {
    //   id: "attendance",
    //   label: "Attendance",
    //   icon: Calendar,
    //   path: "/attendance",
    //   badge: null,
    //   subItems: [
    //     {
    //       id: "daily-attendance",
    //       label: "Daily Attendance",
    //       path: "/attendance/daily",
    //     },
    //     {
    //       id: "monthly-report",
    //       label: "Monthly Report",
    //       path: "/attendance/monthly",
    //     },
    //     {
    //       id: "time-tracking",
    //       label: "Time Tracking",
    //       path: "/attendance/tracking",
    //     },
    //   ],
    // },
    // {
    //   id: "leave",
    //   label: "Leave Management",
    //   icon: CalendarDays,
    //   path: "/leave",
    //   badge: "8",
    //   subItems: [
    //     {
    //       id: "leave-requests",
    //       label: "Leave Requests",
    //       path: "/leave/requests",
    //     },
    //     {
    //       id: "leave-calendar",
    //       label: "Leave Calendar",
    //       path: "/leave/calendar",
    //     },
    //     {
    //       id: "leave-policies",
    //       label: "Leave Policies",
    //       path: "/leave/policies",
    //     },
    //     { id: "leave-balance", label: "Leave Balance", path: "/leave/balance" },
    //   ],
    // },
    // {
    //   id: "training",
    //   label: "Training & Development",
    //   icon: BookOpen,
    //   path: "/training",
    //   badge: null,
    //   subItems: [
    //     {
    //       id: "training-programs",
    //       label: "Training Programs",
    //       path: "/training/programs",
    //     },
    //     {
    //       id: "skill-assessment",
    //       label: "Skill Assessment",
    //       path: "/training/assessment",
    //     },
    //     {
    //       id: "certifications",
    //       label: "Certifications",
    //       path: "/training/certifications",
    //     },
    //     {
    //       id: "learning-paths",
    //       label: "Learning Paths",
    //       path: "/training/paths",
    //     },
    //   ],
    // },
    // {
    //   id: "analytics",
    //   label: "Analytics & Reports",
    //   icon: BarChart3,
    //   path: "/analytics",
    //   badge: null,
    //   subItems: [
    //     { id: "hr-analytics", label: "HR Analytics", path: "/analytics/hr" },
    //     {
    //       id: "employee-reports",
    //       label: "Employee Reports",
    //       path: "/analytics/employees",
    //     },
    //     {
    //       id: "attendance-reports",
    //       label: "Attendance Reports",
    //       path: "/analytics/attendance",
    //     },
    //     {
    //       id: "custom-reports",
    //       label: "Custom Reports",
    //       path: "/analytics/custom",
    //     },
    //   ],
    // },
    // ... other menu items
  ];

  const bottomMenuItems = [
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
    { id: "help", label: "Help & Support", icon: HelpCircle, path: "/help" },
  ];

  // Handle main menu click
  const handleMenuClick = (item) => {
    if (item.componentId) {
      setActiveComponent(item.componentId);
    }
    setActiveMenuItem(activeMenuItem === item.id ? "" : item.id);
  };

  // Handle submenu click
  const handleSubMenuClick = (subItem) => {
    if (subItem.componentId) {
      setActiveComponent(subItem.componentId);
    }
  };

  return (
    <div
      className={`${
        sidebarOpen ? "w-72" : "w-20"
      } bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white transition-all duration-300 min-h-screen flex flex-col shadow-2xl border-r border-slate-700/50 relative overflow-hidden`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 -left-8 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 -right-6 w-20 h-20 bg-gradient-to-br from-orange-500/15 to-pink-500/15 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Logo & Header */}
      <div className="p-6 border-b border-slate-700/50 flex items-center justify-between relative z-10">
        {sidebarOpen && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                HR Portal
              </span>
              <div className="flex items-center space-x-1 mt-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs text-slate-400">Premium</span>
              </div>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white hover:bg-slate-700/50 rounded-xl transition-all duration-200 hover:scale-105"
        >
          {sidebarOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* User Profile */}
      {sidebarOpen && (
        <div className="p-6 border-b border-slate-700/50 relative z-10">
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-600/30">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="w-12 h-12 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-slate-900">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate text-sm uppercase">
                  {user?.name}
                </p>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30 text-xs"
                  >
                    <Shield className="w-3 h-3 mr-1" />
                    {role}
                  </Badge>
                </div>
                {/* <p className="text-xs text-slate-400 mt-1">{branchName}</p> */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Search */}
      {sidebarOpen && (
        <div className="px-6 py-4 relative z-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Quick search..."
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
            />
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {menuItems.map((item) => (
          <div key={item.id} className="group">
            <button
              onClick={() => handleMenuClick(item)}
              className={`w-full flex items-center justify-between p-1 lg:p-2 rounded-xl text-left transition-all duration-200 group relative overflow-hidden ${
                activeMenuItem === item.id ||
                activeComponent === item.componentId
                  ? "bg-gradient-to-r from-slate-700/80 to-slate-600/80 shadow-lg shadow-slate-900/50 scale-[1.02]"
                  : "hover:bg-slate-700/50 hover:scale-[1.01]"
              }`}
            >
              {/* Gradient overlay for active item */}
              {(activeMenuItem === item.id ||
                activeComponent === item.componentId) && (
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-10 rounded-xl`}
                ></div>
              )}

              <div className="flex items-center space-x-3 relative z-10">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    activeMenuItem === item.id ||
                    activeComponent === item.componentId
                      ? `bg-gradient-to-r ${item.gradient} shadow-lg`
                      : "bg-slate-700/50 group-hover:bg-slate-600/50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                {sidebarOpen && (
                  <div className="flex items-center space-x-2 flex-1">
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className="ml-auto text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none shadow-md"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              {sidebarOpen && item.subItems && (
                <ChevronRight
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeMenuItem === item.id ? "rotate-90" : ""
                  }`}
                />
              )}
            </button>

            {/* Sub Menu */}
            {sidebarOpen && item.subItems && activeMenuItem === item.id && (
              <div className="ml-4 mt-2 space-y-1 animate-in slide-in-from-left-2 duration-200">
                {item.subItems.map((subItem) => (
                  <button
                    key={subItem.id}
                    onClick={() => handleSubMenuClick(subItem)}
                    className={`w-full text-left p-3 text-sm rounded-lg transition-all duration-200 flex items-center space-x-3 group ${
                      activeComponent === subItem.componentId
                        ? "bg-gradient-to-r from-slate-600/80 to-slate-500/80 text-white font-medium shadow-md scale-[1.02]"
                        : "text-slate-300 hover:text-white hover:bg-slate-700/50 hover:scale-[1.01]"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        activeComponent === subItem.componentId
                          ? `bg-gradient-to-r ${item.gradient}`
                          : "bg-slate-500 group-hover:bg-slate-400"
                      }`}
                    ></div>
                    <span>{subItem.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-slate-700/50 space-y-2 relative z-10">
        {bottomMenuItems.map((item) => (
          <button
            key={item.id}
            className="w-full flex items-center space-x-3 p-3 rounded-xl text-white hover:bg-slate-700/50 transition-all duration-200 hover:scale-[1.02] group"
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-r ${item.gradient} opacity-80 group-hover:opacity-100 transition-all duration-200`}
            >
              <item.icon className="w-4 h-4" />
            </div>
            {sidebarOpen && <span className="font-medium">{item.label}</span>}
          </button>
        ))}

        <button
          onClick={onSignOut}
          className="w-full flex items-center space-x-3 p-3 rounded-xl text-red-400 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20 hover:text-red-300 transition-all duration-200 hover:scale-[1.02] group"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-r from-red-500/20 to-pink-500/20 group-hover:from-red-500/30 group-hover:to-pink-500/30 transition-all duration-200">
            <LogOut className="w-4 h-4" />
          </div>
          {sidebarOpen && <span className="font-medium">Sign Out</span>}
        </button>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </div>
  );
}
