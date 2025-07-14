import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
// Custom Table components
const Table = ({ children, ...props }) => (
  <div className="w-full overflow-auto">
    <table className="w-full caption-bottom text-sm" {...props}>
      {children}
    </table>
  </div>
);

const TableHeader = ({ children, ...props }) => (
  <thead className="[&_tr]:border-b" {...props}>
    {children}
  </thead>
);

const TableBody = ({ children, ...props }) => (
  <tbody className="[&_tr:last-child]:border-0" {...props}>
    {children}
  </tbody>
);

const TableRow = ({ children, ...props }) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted" {...props}>
    {children}
  </tr>
);

const TableHead = ({ children, ...props }) => (
  <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0" {...props}>
    {children}
  </th>
);

const TableCell = ({ children, ...props }) => (
  <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0" {...props}>
    {children}
  </td>
);
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit3, 
  Download, 
  DollarSign, 
  CreditCard, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Users
} from "lucide-react";

export default function Payroll() {
  const [payrollData, setPayrollData] = useState([
    {
      id: 1,
      employee_id: 101,
      employee_name: "John Doe",
      salary_amount: 5000.00,
      bank_account: "****1234",
      payment_status: "paid",
      salary_month: "2024-01",
      slip_path: "/slips/john_jan_2024.pdf",
      bonus: 500.00,
      deduction: 200.00
    },
    {
      id: 2,
      employee_id: 102,
      employee_name: "Jane Smith",
      salary_amount: 4500.00,
      bank_account: "****5678",
      payment_status: "pending",
      salary_month: "2024-01",
      slip_path: null,
      bonus: 300.00,
      deduction: 150.00
    },
    {
      id: 3,
      employee_id: 103,
      employee_name: "Mike Johnson",
      salary_amount: 5500.00,
      bank_account: "****9012",
      payment_status: "paid",
      salary_month: "2024-01",
      slip_path: "/slips/mike_jan_2024.pdf",
      bonus: 0.00,
      deduction: 300.00
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPayroll, setEditingPayroll] = useState(null);
  const [formData, setFormData] = useState({
    employee_id: "",
    employee_name: "",
    salary_amount: "",
    bank_account: "",
    payment_status: "pending",
    salary_month: "",
    bonus: "",
    deduction: ""
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (editingPayroll) {
      setPayrollData(prev => 
        prev.map(item => 
          item.id === editingPayroll.id 
            ? { ...item, ...formData, id: editingPayroll.id }
            : item
        )
      );
    } else {
      const newPayroll = {
        ...formData,
        id: payrollData.length + 1,
        salary_amount: parseFloat(formData.salary_amount),
        bonus: parseFloat(formData.bonus) || 0,
        deduction: parseFloat(formData.deduction) || 0,
        slip_path: null
      };
      setPayrollData(prev => [...prev, newPayroll]);
    }
    
    setIsDialogOpen(false);
    setEditingPayroll(null);
    setFormData({
      employee_id: "",
      employee_name: "",
      salary_amount: "",
      bank_account: "",
      payment_status: "pending",
      salary_month: "",
      bonus: "",
      deduction: ""
    });
  };

  const handleEdit = (payroll) => {
    setEditingPayroll(payroll);
    setFormData({
      employee_id: payroll.employee_id,
      employee_name: payroll.employee_name,
      salary_amount: payroll.salary_amount,
      bank_account: payroll.bank_account,
      payment_status: payroll.payment_status,
      salary_month: payroll.salary_month,
      bonus: payroll.bonus,
      deduction: payroll.deduction
    });
    setIsDialogOpen(true);
  };

  const calculateNetSalary = (salary, bonus, deduction) => {
    return salary + bonus - deduction;
  };

  const getStatusColor = (status) => {
    return status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
  };

  const totalSalaryPaid = payrollData
    .filter(p => p.payment_status === "paid")
    .reduce((sum, p) => sum + calculateNetSalary(p.salary_amount, p.bonus, p.deduction), 0);

  const totalPendingPayments = payrollData
    .filter(p => p.payment_status === "pending")
    .reduce((sum, p) => sum + calculateNetSalary(p.salary_amount, p.bonus, p.deduction), 0);

  const totalEmployees = payrollData.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payroll Management</h1>
          <p className="text-gray-600 mt-1">Manage employee salaries, bonuses, and deductions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Payroll
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingPayroll ? "Edit Payroll" : "Add New Payroll"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="employee_id">Employee ID</Label>
                <Input
                  id="employee_id"
                  value={formData.employee_id}
                  onChange={(e) => handleInputChange("employee_id", e.target.value)}
                  placeholder="101"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employee_name">Employee Name</Label>
                <Input
                  id="employee_name"
                  value={formData.employee_name}
                  onChange={(e) => handleInputChange("employee_name", e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary_amount">Monthly Salary</Label>
                <Input
                  id="salary_amount"
                  type="number"
                  value={formData.salary_amount}
                  onChange={(e) => handleInputChange("salary_amount", e.target.value)}
                  placeholder="5000.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bank_account">Bank Account</Label>
                <Input
                  id="bank_account"
                  value={formData.bank_account}
                  onChange={(e) => handleInputChange("bank_account", e.target.value)}
                  placeholder="****1234"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment_status">Payment Status</Label>
                <Select value={formData.payment_status} onValueChange={(value) => handleInputChange("payment_status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary_month">Salary Month</Label>
                <Input
                  id="salary_month"
                  type="month"
                  value={formData.salary_month}
                  onChange={(e) => handleInputChange("salary_month", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bonus">Bonus (Optional)</Label>
                <Input
                  id="bonus"
                  type="number"
                  value={formData.bonus}
                  onChange={(e) => handleInputChange("bonus", e.target.value)}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deduction">Deduction (Optional)</Label>
                <Input
                  id="deduction"
                  type="number"
                  value={formData.deduction}
                  onChange={(e) => handleInputChange("deduction", e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                {editingPayroll ? "Update" : "Add"} Payroll
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">Active payroll records</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalSalaryPaid.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Completed payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">${totalPendingPayments.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">January 2024</div>
            <p className="text-xs text-muted-foreground">Current payroll period</p>
          </CardContent>
        </Card>
      </div>

      {/* Payroll Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payroll Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Base Salary</TableHead>
                <TableHead>Bank Account</TableHead>
                <TableHead>Bonus</TableHead>
                <TableHead>Deduction</TableHead>
                <TableHead>Net Salary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollData.map((payroll) => (
                <TableRow key={payroll.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{payroll.employee_name}</div>
                      <div className="text-sm text-gray-500">ID: {payroll.employee_id}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">${payroll.salary_amount.toFixed(2)}</TableCell>
                  <TableCell>{payroll.bank_account}</TableCell>
                  <TableCell>
                    {payroll.bonus > 0 ? (
                      <span className="flex items-center text-green-600">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        ${payroll.bonus.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {payroll.deduction > 0 ? (
                      <span className="flex items-center text-red-600">
                        <TrendingDown className="w-3 h-3 mr-1" />
                        ${payroll.deduction.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell className="font-bold">
                    ${calculateNetSalary(payroll.salary_amount, payroll.bonus, payroll.deduction).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payroll.payment_status)}>
                      {payroll.payment_status}
                    </Badge>
                  </TableCell>
                  <TableCell>{payroll.salary_month}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(payroll)}
                      >
                        <Edit3 className="w-3 h-3" />
                      </Button>
                      {payroll.slip_path && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(payroll.slip_path, '_blank')}
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}