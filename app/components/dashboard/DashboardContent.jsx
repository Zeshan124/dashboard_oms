"use client";

import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
// Import dashboard components
import Sidebar from "./Sidebar";
import RecentEmployees from "./RecentEmployees";
import QuickAnalytics from "./QuickAnalytics";
import QuickActions from "./QuickActions";
import MetricsCards from "./MetricsCards";
import PendingActions from "./PendingActions";
import DepartmentOverview from "./DepartmentOverview";
import Header from "./Header";
import AddEmployee from "../employees/AddEmployee";
import AllEmployees from "../employees/AllEmployees";
import Payroll from "../payroll/Payroll";
import Complaint from "../complaint/Complaint";

export default function DashboardContent({
  userData,
  dashboardData,
  initialActiveComponent,
}) {
  const { user, role, branchName, isAuthenticated } = userData;
  const { hrStats, recentEmployees, pendingActions, departmentData } =
    dashboardData;

  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const [activeComponent, setActiveComponent] = useState(
    initialActiveComponent || "dashboard"
  );

  // Component rendering function
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return (
          <>
            <div className="flex items-center justify-between py-4">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-gray-600 mt-1">
                  Manage and view all employees in your organization
                </p>
              </div>
            </div>
            <MetricsCards hrStats={hrStats} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <RecentEmployees employees={recentEmployees} />
              <PendingActions actions={pendingActions} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <DepartmentOverview departmentData={departmentData} />
              <QuickAnalytics hrStats={hrStats} />
            </div>
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

      // Payroll component
      case "payroll":
        return <Payroll />;

      // Complaint
      case "complaint":
        return <Complaint />;

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

  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        user={user}
        role={role}
        branchName={branchName}
        onSignOut={handleSignOut}
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">{renderActiveComponent()}</div>
        </div>
      </div>
    </div>
  );
}
