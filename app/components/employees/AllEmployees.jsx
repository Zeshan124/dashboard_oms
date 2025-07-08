"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";

import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function AllEmployees() {
  /* ------------------ state ------------------ */
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(null); // detail‑view dialog

  /* ------------------ dummy data ------------------ */
  const employees = [
    {
      id: 1,
      name: "Sarah Johnson",
      cnic: "42101-1234567-9",
      position: "Senior Software Engineer",
      department: "Engineering",
      email: "sarah.johnson@company.com",
      phone: "+1 (555) 123‑4567",
      location: "New York, NY",
      status: "Active",
      joinDate: "2022‑03‑15",
      avatar: "",
      bank: { accountNo: "123456789", bankName: "Chase", branch: "NYC" },
      payroll: { basic: 90000, allowances: 10000, deductions: 5000 },
    },
    {
      id: 2,
      name: "Michael Chen",
      cnic: "35202-7654321-3",
      position: "Product Manager",
      department: "Product",
      email: "michael.chen@company.com",
      phone: "+1 (555) 234‑5678",
      location: "San Francisco, CA",
      status: "Active",
      joinDate: "2021‑08‑20",
      avatar: "",
      bank: {
        accountNo: "987654321",
        bankName: "Bank of America",
        branch: "SF",
      },
      payroll: { basic: 85000, allowances: 8000, deductions: 4000 },
    },
    {
      id: 3,
      name: "Emily Davis",
      cnic: "61101-1212121-5",
      position: "UX Designer",
      department: "Design",
      email: "emily.davis@company.com",
      phone: "+1 (555) 345‑6789",
      location: "Austin, TX",
      status: "Active",
      joinDate: "2023‑01‑10",
      avatar: "",
      bank: {
        accountNo: "555666777",
        bankName: "Wells Fargo",
        branch: "Austin",
      },
      payroll: { basic: 70000, allowances: 6000, deductions: 3500 },
    },
    {
      id: 4,
      name: "James Wilson",
      cnic: "37404-4567890-1",
      position: "Data Analyst",
      department: "Analytics",
      email: "james.wilson@company.com",
      phone: "+1 (555) 456‑7890",
      location: "Chicago, IL",
      status: "On Leave",
      joinDate: "2022‑11‑05",
      avatar: "",
      bank: { accountNo: "888999000", bankName: "Chase", branch: "Chicago" },
      payroll: { basic: 65000, allowances: 5500, deductions: 3000 },
    },
    {
      id: 5,
      name: "Lisa Anderson",
      cnic: "35201-9876543-8",
      position: "HR Specialist",
      department: "Human Resources",
      email: "lisa.anderson@company.com",
      phone: "+1 (555) 567‑8901",
      location: "Boston, MA",
      status: "Active",
      joinDate: "2020‑05‑18",
      avatar: "",
      bank: { accountNo: "112233445", bankName: "Citibank", branch: "Boston" },
      payroll: { basic: 60000, allowances: 7000, deductions: 2500 },
    },
  ];

  /* ------------------ helpers ------------------ */
  const filteredEmployees = employees.filter((emp) =>
    [emp.name, emp.position, emp.department, emp.cnic]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleEdit = (emp) => {
    alert(`Edit employee: ${emp.name} (dummy action)`);
  };

  const handleDelete = (id) => {
    const ok = confirm("Are you sure you want to delete?");
    if (ok) alert(`Deleted employee id ${id} (dummy action)`);
  };

  /* ------------------ JSX ------------------ */
  return (
    <div className="space-y-6">
      {/* ---------- Header ---------- */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">All Employees</h1>
          <p className="text-gray-600 mt-1">
            Manage and view all employees in your organization
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Add Employee
          </Button>
        </div>
      </div>

      {/* ---------- Filters ---------- */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ---------- Employee List ---------- */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>
            {filteredEmployees.length} of {employees.length} employees
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {filteredEmployees.map((emp) => (
              <div
                key={emp.id}
                onClick={() => setSelected(emp)}
                className="cursor-pointer flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                {/* ----- Left block ----- */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={emp.avatar} />
                    <AvatarFallback>
                      {emp.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h3 className="font-semibold">{emp.name}</h3>
                    <p className="text-sm text-gray-600">{emp.position}</p>
                    <p className="text-xs text-gray-500">{emp.department}</p>
                    <p className="text-xs text-gray-500">CNIC: {emp.cnic}</p>
                  </div>
                </div>

                {/* ----- Right block ----- */}
                <div className="flex items-center space-x-6">
                  {/* Contact info (hidden on small) */}
                  <div className="hidden md:block text-sm text-gray-600 space-y-1">
                    <div className="flex items-center">
                      <Mail className="w-3 h-3 mr-2" />
                      {emp.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-3 h-3 mr-2" />
                      {emp.phone}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-2" />
                      {emp.location}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="text-right">
                    <Badge
                      variant={
                        emp.status === "Active" ? "default" : "secondary"
                      }
                      className="mb-2"
                    >
                      {emp.status}
                    </Badge>
                    <p className="text-xs text-gray-500">
                      Joined: {new Date(emp.joinDate).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Dropdown menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(emp)}>
                        ✏️ Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(emp.id)}>
                        🗑️ Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ---------- Detail Dialog ---------- */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.name}</DialogTitle>
                <DialogDescription>{selected.position}</DialogDescription>
              </DialogHeader>

              <div className="space-y-2">
                <p>
                  <strong>Department:</strong> {selected.department}
                </p>
                <p>
                  <strong>CNIC:</strong> {selected.cnic}
                </p>
                <p>
                  <strong>Email:</strong> {selected.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selected.phone}
                </p>
                <p>
                  <strong>Location:</strong> {selected.location}
                </p>
                <p>
                  <strong>Status:</strong> {selected.status}
                </p>
              </div>

              {/* Bank */}
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Bank Details</h4>
                <p>Bank: {selected.bank.bankName}</p>
                <p>Account #: {selected.bank.accountNo}</p>
                <p>Branch: {selected.bank.branch}</p>
              </div>

              {/* Payroll */}
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Payroll</h4>
                <p>Basic: ${selected.payroll.basic.toLocaleString()}</p>
                <p>
                  Allowances: ${selected.payroll.allowances.toLocaleString()}
                </p>
                <p>
                  Deductions: ${selected.payroll.deductions.toLocaleString()}
                </p>
                <hr className="my-2" />
                <p className="font-bold">
                  Net Pay: $
                  {(
                    selected.payroll.basic +
                    selected.payroll.allowances -
                    selected.payroll.deductions
                  ).toLocaleString()}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
