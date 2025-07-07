"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Building2, Menu, X, ChevronRight, LogOut, Settings, HelpCircle,
  Home, Users, UserPlus, Clock, CalendarDays, CreditCard, Target,
  BookOpen, BarChart3
} from "lucide-react";

export default function Sidebar({ user, role, branchName, onSignOut, activeComponent, setActiveComponent }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState("employees"); // Default to employees for demo

  // Sidebar menu items
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      path: "/dashboard",
      badge: null,
      componentId: "dashboard" // Add componentId for mapping
    },
    {
      id: "employees",
      label: "Employees",
      icon: Users,
      path: "/employees",
      badge: "1,247",
      subItems: [
        { id: "all-employees", label: "All Employees", path: "/employees", componentId: "all-employees" },
        { id: "add-employee", label: "Add Employee", path: "/employees", componentId: "add-employee" },
        { id: "employee-profiles", label: "Profiles", path: "/employees/profiles", componentId: "employee-profiles" },
        { id: "org-chart", label: "Organization Chart", path: "/employees/org-chart", componentId: "org-chart" }
      ]
    },
    {
      id: "recruitment",
      label: "Recruitment",
      icon: UserPlus,
      path: "/recruitment",
      badge: "15",
      subItems: [
        { id: "job-postings", label: "Job Postings", path: "/recruitment/jobs", componentId: "job-postings" },
        { id: "candidates", label: "Candidates", path: "/recruitment/candidates", componentId: "candidates" },
        { id: "interviews", label: "Interviews", path: "/recruitment/interviews", componentId: "interviews" },
        { id: "offers", label: "Offers", path: "/recruitment/offers", componentId: "offers" }
      ]
    },
    {
        id: "attendance",
        label: "Attendance",
        icon: Clock,
        path: "/attendance",
        badge: null,
        subItems: [
          { id: "daily-attendance", label: "Daily Attendance", path: "/attendance/daily" },
          { id: "monthly-report", label: "Monthly Report", path: "/attendance/monthly" },
          { id: "time-tracking", label: "Time Tracking", path: "/attendance/tracking" }
        ]
      },
      {
        id: "leave",
        label: "Leave Management",
        icon: CalendarDays,
        path: "/leave",
        badge: "8",
        subItems: [
          { id: "leave-requests", label: "Leave Requests", path: "/leave/requests" },
          { id: "leave-calendar", label: "Leave Calendar", path: "/leave/calendar" },
          { id: "leave-policies", label: "Leave Policies", path: "/leave/policies" },
          { id: "leave-balance", label: "Leave Balance", path: "/leave/balance" }
        ]
      },
      {
        id: "payroll",
        label: "Payroll",
        icon: CreditCard,
        path: "/payroll",
        badge: null,
        subItems: [
          { id: "salary-management", label: "Salary Management", path: "/payroll/salary" },
          { id: "payroll-processing", label: "Payroll Processing", path: "/payroll/processing" },
          { id: "tax-management", label: "Tax Management", path: "/payroll/tax" },
          { id: "payslips", label: "Payslips", path: "/payroll/payslips" }
        ]
      },
      {
        id: "performance",
        label: "Performance",
        icon: Target,
        path: "/performance",
        badge: "23",
        subItems: [
          { id: "reviews", label: "Performance Reviews", path: "/performance/reviews" },
          { id: "goals", label: "Goals & KPIs", path: "/performance/goals" },
          { id: "feedback", label: "360 Feedback", path: "/performance/feedback" },
          { id: "appraisals", label: "Appraisals", path: "/performance/appraisals" }
        ]
      },
      {
        id: "training",
        label: "Training & Development",
        icon: BookOpen,
        path: "/training",
        badge: null,
        subItems: [
          { id: "training-programs", label: "Training Programs", path: "/training/programs" },
          { id: "skill-assessment", label: "Skill Assessment", path: "/training/assessment" },
          { id: "certifications", label: "Certifications", path: "/training/certifications" },
          { id: "learning-paths", label: "Learning Paths", path: "/training/paths" }
        ]
      },
      {
        id: "analytics",
        label: "Analytics & Reports",
        icon: BarChart3,
        path: "/analytics",
        badge: null,
        subItems: [
          { id: "hr-analytics", label: "HR Analytics", path: "/analytics/hr" },
          { id: "employee-reports", label: "Employee Reports", path: "/analytics/employees" },
          { id: "attendance-reports", label: "Attendance Reports", path: "/analytics/attendance" },
          { id: "custom-reports", label: "Custom Reports", path: "/analytics/custom" }
        ]
      }
    // ... other menu items
  ];

  const bottomMenuItems = [
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
    { id: "help", label: "Help & Support", icon: HelpCircle, path: "/help" }
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
    <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
      {/* Logo & Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">HR Portal</h2>
                <p className="text-xs text-gray-500">{branchName}</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* User Profile */}
      {sidebarOpen && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>{user?.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-sm text-gray-500 truncate">{role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => handleMenuClick(item)}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                activeMenuItem === item.id
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5" />
                {sidebarOpen && (
                  <>
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </div>
              {sidebarOpen && item.subItems && (
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  activeMenuItem === item.id ? 'rotate-90' : ''
                }`} />
              )}
            </button>
            
            {/* Sub Menu */}
            {sidebarOpen && item.subItems && activeMenuItem === item.id && (
              <div className="ml-8 mt-2 space-y-1">
                {item.subItems.map((subItem) => (
                  <button
                    key={subItem.id}
                    onClick={() => handleSubMenuClick(subItem)}
                    className={`w-full text-left p-2 text-sm rounded-md transition-colors ${
                      activeComponent === subItem.componentId
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {subItem.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        {bottomMenuItems.map((item) => (
          <button
            key={item.id}
            className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <item.icon className="w-5 h-5" />
            {sidebarOpen && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
        
        <button
          onClick={onSignOut}
          className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {sidebarOpen && <span className="font-medium">Sign Out</span>}
        </button>
      </div>
    </div>
  );
}