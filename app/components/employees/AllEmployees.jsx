"use client";
import { useState } from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,} from "@/components/ui/dialog";
import { Search, Filter, Download, MoreHorizontal, Mail, Phone, MapPin, User, Building, CreditCard, Save, X,} from "lucide-react";

export default function AllEmployees() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(null); 
  const [editingEmployee, setEditingEmployee] = useState(null); 
  const [formData, setFormData] = useState({});

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

  const filteredEmployees = employees.filter((emp) =>
    [emp.name, emp.position, emp.department, emp.cnic]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleEdit = (emp) => {
    setSelected(null);
    setEditingEmployee(emp);
    setFormData({
      name: emp.name,
      cnic: emp.cnic,
      position: emp.position,
      department: emp.department,
      email: emp.email,
      phone: emp.phone,
      location: emp.location,
      status: emp.status,
      joinDate: emp.joinDate,
      bankAccountNo: emp.bank.accountNo,
      bankName: emp.bank.bankName,
      bankBranch: emp.bank.branch,
      basicSalary: emp.payroll.basic,
      allowances: emp.payroll.allowances,
      deductions: emp.payroll.deductions,
    });
  };

  const handleDelete = (id) => {
    const ok = confirm("Are you sure you want to delete?");
    if (ok) alert(`Deleted employee id ${id} (dummy action)`);
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // const handleUpdateEmployee = async () => {
  //   try {
  //     const response = await fetch(`/api/employees/${editingEmployee.id}`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(formData)
  //     });

  //     if (response.ok) {
  //       // Handle success
  //       alert('Employee updated successfully!');
  //       setEditingEmployee(null);
  //       // Refresh employee list
  //     }
  //   } catch (error) {
  //     console.error('Error updating employee:', error);
  //   }
  // };

  const handleUpdateEmployee = () => {
    console.log("Updating employee with data:", formData);
    alert(`Employee ${formData.name} updated successfully! (dummy action)`);
    setEditingEmployee(null);
    setFormData({});
  };

  const closeEditForm = () => {
    setEditingEmployee(null);
    setFormData({});
  };

  return (
    <div className="py-6 space-y-6 bg-gray-50 min-h-screen">
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
        </div>
      </div>

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
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(emp);
                        }}
                      >
                        ✏️ Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(emp.id);
                        }}
                      >
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

      {/* ---------- Employee Detail Dialog ---------- */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg p-0 overflow-hidden">
          <button
            onClick={() => setSelected(null)}
            s
            className="absolute top-4 right-4 z-10 text-red-500 hover:text-red-700 transition-colors"
            aria-label="Close"
            type="button"
          >
            <X className="w-6 h-6" />
          </button>
          {selected && (
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-lg shadow-lg">
              <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#1334A5] via-[#011152] to-[#011152] text-white rounded-t-lg">
                <Avatar className="w-20 h-20 mb-3 ring-4 ring-white shadow-lg">
                  <AvatarImage src={selected.avatar} />
                  <AvatarFallback className="bg-white text-blue-600 font-bold text-2xl">
                    {selected.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold mb-1">{selected.name}</h2>
                <p className="text-lg font-medium opacity-90">
                  {selected.position}
                </p>
                <Badge className="mt-2 px-3 py-1 text-sm bg-green-100 text-green-700 border-none">
                  {selected.status}
                </Badge>
              </div>
              <div className="p-6 space-y-6">
                <div className="bg-white rounded-lg shadow p-4 border border-blue-100">
                  <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                    <User className="w-4 h-4" /> Personal Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-400" />
                      <span>{selected.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-400" />
                      <span>{selected.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span>{selected.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-400" />
                      <span>CNIC: {selected.cnic}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-blue-400" />
                      <span>{selected.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Joined:</span>
                      <span>
                        {new Date(selected.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg shadow p-4 border border-blue-100">
                  <h4 className="font-semibold mb-2 text-blue-700 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" /> Bank Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                    <div>
                      Bank:{" "}
                      <span className="font-medium">
                        {selected.bank.bankName}
                      </span>
                    </div>
                    <div>
                      Account #:{" "}
                      <span className="font-medium">
                        {selected.bank.accountNo}
                      </span>
                    </div>
                    <div>
                      Branch:{" "}
                      <span className="font-medium">
                        {selected.bank.branch}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg shadow p-4 border border-purple-100">
                  <h4 className="font-semibold mb-2 text-purple-700 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" /> Payroll
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                    <div>
                      Basic:{" "}
                      <span className="font-medium">
                        ${selected.payroll.basic.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      Allowances:{" "}
                      <span className="font-medium">
                        ${selected.payroll.allowances.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      Deductions:{" "}
                      <span className="font-medium">
                        ${selected.payroll.deductions.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="font-bold mt-4 text-lg text-purple-700 text-center">
                    Net Pay: $
                    {(
                      selected.payroll.basic +
                      selected.payroll.allowances -
                      selected.payroll.deductions
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={!!editingEmployee} onOpenChange={closeEditForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Edit Employee: {editingEmployee?.name}
            </DialogTitle>
            <DialogDescription>
              Update employee information and save changes.
            </DialogDescription>
          </DialogHeader>
          {editingEmployee && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name || ""}
                      onChange={(e) => handleFormChange("name", e.target.value)}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnic">CNIC</Label>
                    <Input
                      id="cnic"
                      value={formData.cnic || ""}
                      onChange={(e) => handleFormChange("cnic", e.target.value)}
                      placeholder="XXXXX-XXXXXXX-X"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email || ""}
                      onChange={(e) =>
                        handleFormChange("email", e.target.value)
                      }
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone || ""}
                      onChange={(e) =>
                        handleFormChange("phone", e.target.value)
                      }
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location || ""}
                      onChange={(e) =>
                        handleFormChange("location", e.target.value)
                      }
                      placeholder="Enter location"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="joinDate">Join Date</Label>
                    <Input
                      id="joinDate"
                      type="date"
                      value={formData.joinDate || ""}
                      onChange={(e) =>
                        handleFormChange("joinDate", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Work Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={formData.position || ""}
                      onChange={(e) =>
                        handleFormChange("position", e.target.value)
                      }
                      placeholder="Enter position"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={formData.department || ""}
                      onValueChange={(value) =>
                        handleFormChange("department", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Product">Product</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="HR">Human Resources</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status || ""}
                      onValueChange={(value) =>
                        handleFormChange("status", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="On Leave">On Leave</SelectItem>
                        <SelectItem value="Terminated">Terminated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Bank Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      value={formData.bankName || ""}
                      onChange={(e) =>
                        handleFormChange("bankName", e.target.value)
                      }
                      placeholder="Enter bank name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankAccountNo">Account Number</Label>
                    <Input
                      id="bankAccountNo"
                      value={formData.bankAccountNo || ""}
                      onChange={(e) =>
                        handleFormChange("bankAccountNo", e.target.value)
                      }
                      placeholder="Enter account number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankBranch">Branch</Label>
                    <Input
                      id="bankBranch"
                      value={formData.bankBranch || ""}
                      onChange={(e) =>
                        handleFormChange("bankBranch", e.target.value)
                      }
                      placeholder="Enter branch"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Payroll Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="basicSalary">Basic Salary ($)</Label>
                    <Input
                      id="basicSalary"
                      type="number"
                      value={formData.basicSalary || ""}
                      onChange={(e) =>
                        handleFormChange(
                          "basicSalary",
                          parseInt(e.target.value) || 0
                        )
                      }
                      placeholder="Enter basic salary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allowances">Allowances ($)</Label>
                    <Input
                      id="allowances"
                      type="number"
                      value={formData.allowances || ""}
                      onChange={(e) =>
                        handleFormChange(
                          "allowances",
                          parseInt(e.target.value) || 0
                        )
                      }
                      placeholder="Enter allowances"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deductions">Deductions ($)</Label>
                    <Input
                      id="deductions"
                      type="number"
                      value={formData.deductions || ""}
                      onChange={(e) =>
                        handleFormChange(
                          "deductions",
                          parseInt(e.target.value) || 0
                        )
                      }
                      placeholder="Enter deductions"
                    />
                  </div>
                </div>
                {(formData.basicSalary ||
                  formData.allowances ||
                  formData.deductions) && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">
                      <p>
                        Net Salary:{" "}
                        <span className="font-semibold">
                          $
                          {(
                            (formData.basicSalary || 0) +
                            (formData.allowances || 0) -
                            (formData.deductions || 0)
                          ).toLocaleString()}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={closeEditForm}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleUpdateEmployee}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Update Employee
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}