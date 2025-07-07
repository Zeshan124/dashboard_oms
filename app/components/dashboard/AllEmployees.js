"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, Tab } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const mockEmployees = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 555-1234",
    department: "Engineering",
    position: "Software Engineer",
    avatar: "",
    personal: {
      dob: "1990-05-12",
      gender: "Female",
      address: "123 Main St, City, Country",
      maritalStatus: "Single",
      cnic: "12345-6789012-3",
    },
    bank: {
      bankName: "ABC Bank",
      accountNumber: "1234567890",
      branch: "Downtown",
      iban: "PK00ABC1234567890",
    },
    payroll: {
      salary: 120000,
      payType: "Monthly",
      allowances: 15000,
      deductions: 5000,
      netPay: 130000,
    },
    responsibility: {
      manager: "Michael Chen",
      team: "Frontend",
      projects: ["Project A", "Project B"],
      joiningDate: "2022-01-15",
    },
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+1 555-5678",
    department: "Product",
    position: "Product Manager",
    avatar: "",
    personal: {
      dob: "1987-09-23",
      gender: "Male",
      address: "456 Elm St, City, Country",
      maritalStatus: "Married",
      cnic: "23456-7890123-4",
    },
    bank: {
      bankName: "XYZ Bank",
      accountNumber: "9876543210",
      branch: "Uptown",
      iban: "PK00XYZ9876543210",
    },
    payroll: {
      salary: 150000,
      payType: "Monthly",
      allowances: 20000,
      deductions: 7000,
      netPay: 163000,
    },
    responsibility: {
      manager: "Lisa Anderson",
      team: "Product",
      projects: ["Project X"],
      joiningDate: "2021-07-10",
    },
  },
];

export default function AllEmployees() {
  const [selectedEmployee, setSelectedEmployee] = useState(mockEmployees[0]);
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Employee List */}
      <div className="w-full lg:w-1/3">
        <Card>
          <CardHeader>
            <CardTitle>All Employees</CardTitle>
            <CardDescription>
              Select an employee to view details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-gray-200">
              {mockEmployees.map((emp) => (
                <li
                  key={emp.id}
                  className={`flex items-center gap-4 py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2 ${
                    selectedEmployee.id === emp.id ? "bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedEmployee(emp)}
                >
                  <Avatar>
                    <AvatarImage src={emp.avatar} />
                    <AvatarFallback>
                      {emp.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-900">{emp.name}</div>
                    <div className="text-xs text-gray-500">
                      {emp.position} - {emp.department}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Employee Details */}
      <div className="w-full lg:w-2/3">
        <Card>
          <CardHeader>
            <CardTitle>{selectedEmployee.name}</CardTitle>
            <CardDescription>
              {selectedEmployee.position} - {selectedEmployee.department}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Tabs for details */}
            <div className="mb-4 flex gap-2 border-b">
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === "personal"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("personal")}
              >
                Personal Info
              </button>
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === "bank"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("bank")}
              >
                Bank Info
              </button>
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === "payroll"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("payroll")}
              >
                Payroll
              </button>
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === "responsibility"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("responsibility")}
              >
                Responsibility
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "personal" && (
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Email:</span>{" "}
                  {selectedEmployee.email}
                </div>
                <div>
                  <span className="font-semibold">Phone:</span>{" "}
                  {selectedEmployee.phone}
                </div>
                <div>
                  <span className="font-semibold">Date of Birth:</span>{" "}
                  {selectedEmployee.personal.dob}
                </div>
                <div>
                  <span className="font-semibold">Gender:</span>{" "}
                  {selectedEmployee.personal.gender}
                </div>
                <div>
                  <span className="font-semibold">Address:</span>{" "}
                  {selectedEmployee.personal.address}
                </div>
                <div>
                  <span className="font-semibold">Marital Status:</span>{" "}
                  {selectedEmployee.personal.maritalStatus}
                </div>
                <div>
                  <span className="font-semibold">CNIC:</span>{" "}
                  {selectedEmployee.personal.cnic}
                </div>
              </div>
            )}
            {activeTab === "bank" && (
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Bank Name:</span>{" "}
                  {selectedEmployee.bank.bankName}
                </div>
                <div>
                  <span className="font-semibold">Account Number:</span>{" "}
                  {selectedEmployee.bank.accountNumber}
                </div>
                <div>
                  <span className="font-semibold">Branch:</span>{" "}
                  {selectedEmployee.bank.branch}
                </div>
                <div>
                  <span className="font-semibold">IBAN:</span>{" "}
                  {selectedEmployee.bank.iban}
                </div>
              </div>
            )}
            {activeTab === "payroll" && (
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Salary:</span> Rs.{" "}
                  {selectedEmployee.payroll.salary.toLocaleString()}
                </div>
                <div>
                  <span className="font-semibold">Pay Type:</span>{" "}
                  {selectedEmployee.payroll.payType}
                </div>
                <div>
                  <span className="font-semibold">Allowances:</span> Rs.{" "}
                  {selectedEmployee.payroll.allowances.toLocaleString()}
                </div>
                <div>
                  <span className="font-semibold">Deductions:</span> Rs.{" "}
                  {selectedEmployee.payroll.deductions.toLocaleString()}
                </div>
                <div>
                  <span className="font-semibold">Net Pay:</span> Rs.{" "}
                  {selectedEmployee.payroll.netPay.toLocaleString()}
                </div>
              </div>
            )}
            {activeTab === "responsibility" && (
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Manager:</span>{" "}
                  {selectedEmployee.responsibility.manager}
                </div>
                <div>
                  <span className="font-semibold">Team:</span>{" "}
                  {selectedEmployee.responsibility.team}
                </div>
                <div>
                  <span className="font-semibold">Projects:</span>{" "}
                  {selectedEmployee.responsibility.projects.join(", ")}
                </div>
                <div>
                  <span className="font-semibold">Joining Date:</span>{" "}
                  {selectedEmployee.responsibility.joiningDate}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
