"use client";

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { signOut } from "next-auth/react";

// Import dashboard components
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import MetricsCards from "../components/dashboard/MetricsCards";
import RecentEmployees from "../components/dashboard/RecentEmployees";
import PendingActions from "../components/dashboard/PendingActions";
import DepartmentOverview from "../components/dashboard/DepartmentOverview";
import QuickAnalytics from "../components/dashboard/QuickAnalytics";
import QuickActions from "../components/dashboard/QuickActions";

// Import employee components
import AllEmployees from "../components/employees/AllEmployees";
import AddEmployee from "../components/employees/AddEmployee";
// import AddEmployee from "../components/employees/AddEmployee";
// import EmployeeProfiles from "../components/employees/EmployeeProfiles";
// import OrgChart from "../components/employees/OrgChart";

export default function DashboardContent() {
  const { user, role, branchName, isAuthenticated } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const [activeComponent, setActiveComponent] = useState("dashboard"); // Track active component

  if (!isAuthenticated) return null;

  // Component rendering function
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return (
          <>
            {/* Key Metrics Cards */}
            <MetricsCards hrStats={hrStats} />

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <RecentEmployees employees={recentEmployees} />
              <PendingActions actions={pendingActions} />
            </div>

            {/* Department Overview & Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <DepartmentOverview departmentData={departmentData} />
              <QuickAnalytics hrStats={hrStats} />
            </div>

            {/* Action Items & Navigation */}
            <QuickActions />
          </>
        );

      // Employee Components
      case "all-employees":
        return <AllEmployees />;

      case "add-employee":
        return <AddEmployee />;

      case "employee-profiles":
        return <EmployeeProfiles />;

      case "org-chart":
        return <OrgChart />;

      // Add more cases for other components
      case "job-postings":
        return <div>Job Postings Component</div>;

      case "candidates":
        return <div>Candidates Component</div>;

      default:
        return (
          <div className="p-8 text-center text-gray-500">
            Component not found
          </div>
        );
    }
  };

  // Mock data for HR dashboard
  const hrStats = {
    totalEmployees: 1247,
    newHires: 23,
    departures: 8,
    openPositions: 15,
    attendanceRate: 94.2,
    avgSalary: 75000,
    trainingCompletion: 87.5,
    employeeSatisfaction: 4.2,
  };

  const recentEmployees = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Software Engineer",
      department: "Engineering",
      avatar: "",
      status: "active",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Product Manager",
      department: "Product",
      avatar: "",
      status: "active",
      joinDate: "2024-01-12",
    },
    {
      id: 3,
      name: "Emily Davis",
      position: "UX Designer",
      department: "Design",
      avatar: "",
      status: "active",
      joinDate: "2024-01-10",
    },
    {
      id: 4,
      name: "James Wilson",
      position: "Data Analyst",
      department: "Analytics",
      avatar: "",
      status: "active",
      joinDate: "2024-01-08",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      position: "HR Specialist",
      department: "Human Resources",
      avatar: "",
      status: "active",
      joinDate: "2024-01-05",
    },
  ];

  const pendingActions = [
    {
      id: 1,
      type: "Leave Request",
      employee: "John Doe",
      date: "Jan 25-27",
      status: "pending",
    },
    {
      id: 2,
      type: "Performance Review",
      employee: "Jane Smith",
      date: "Due Jan 30",
      status: "overdue",
    },
    {
      id: 3,
      type: "Onboarding",
      employee: "Mike Johnson",
      date: "Started Jan 22",
      status: "in-progress",
    },
    {
      id: 4,
      type: "Document Upload",
      employee: "Sarah Wilson",
      date: "Missing I-9",
      status: "pending",
    },
  ];

  const departmentData = [
    { name: "Engineering", employees: 342, growth: "+5.2%" },
    { name: "Sales", employees: 198, growth: "+8.1%" },
    { name: "Marketing", employees: 127, growth: "+2.3%" },
    { name: "Support", employees: 89, growth: "-1.2%" },
    { name: "HR", employees: 45, growth: "+12.5%" },
    { name: "Finance", employees: 38, growth: "+3.4%" },
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        user={user}
        role={role}
        branchName={branchName}
        onSignOut={handleSignOut}
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent} // Pass the setter function
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          user={user}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          activeComponent={activeComponent} // Pass active component for dynamic title
        />

        {/* Main Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">{renderActiveComponent()}</div>
        </div>
      </div>
    </div>
  );
}
