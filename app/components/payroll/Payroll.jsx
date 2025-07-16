import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Users,
  Filter,
  Search,
  MoreHorizontal,
  Eye,
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Table Components
const Table = ({ children }) => (
  <div className="w-full overflow-auto">
    <table className="w-full caption-bottom text-sm">{children}</table>
  </div>
);

const TableHeader = ({ children }) => (
  <thead className="[&_tr]:border-b">{children}</thead>
);
const TableBody = ({ children }) => (
  <tbody className="[&_tr:last-child]:border-0">{children}</tbody>
);
const TableRow = ({ children, className = "" }) => (
  <tr className={`border-b transition-colors hover:bg-muted/50 ${className}`}>
    {children}
  </tr>
);
const TableHead = ({ children }) => (
  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
    {children}
  </th>
);
const TableCell = ({ children, className = "" }) => (
  <td className={`p-4 align-middle ${className}`}>{children}</td>
);

// Statistics Card Component
const StatCard = ({ title, value, subtitle, icon: Icon, color = "blue" }) => {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    yellow: "text-yellow-600",
    purple: "text-purple-600",
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <Icon className={`h-5 w-5 ${colorClasses[color]}`} />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${colorClasses[color]}`}>
          {value}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );
};

// PayrollForm Component
const PayrollForm = ({
  formData,
  onInputChange,
  onSubmit,
  onCancel,
  isEditing,
}) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Employee ID</label>
        <Input
          value={formData.employee_id}
          onChange={(e) => onInputChange("employee_id", e.target.value)}
          placeholder="101"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Employee Name</label>
        <Input
          value={formData.employee_name}
          onChange={(e) => onInputChange("employee_name", e.target.value)}
          placeholder="John Doe"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Monthly Salary</label>
        <Input
          type="number"
          value={formData.salary_amount}
          onChange={(e) => onInputChange("salary_amount", e.target.value)}
          placeholder="5000.00"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Bank Account</label>
        <Input
          value={formData.bank_account}
          onChange={(e) => onInputChange("bank_account", e.target.value)}
          placeholder="****1234"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Salary Month</label>
        <Input
          type="month"
          value={formData.salary_month}
          onChange={(e) => onInputChange("salary_month", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Payment Status</label>
        <select
          className="w-full p-2 border rounded-md"
          value={formData.payment_status}
          onChange={(e) => onInputChange("payment_status", e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Bonus (Optional)</label>
        <Input
          type="number"
          value={formData.bonus}
          onChange={(e) => onInputChange("bonus", e.target.value)}
          placeholder="0.00"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Deduction (Optional)</label>
        <Input
          type="number"
          value={formData.deduction}
          onChange={(e) => onInputChange("deduction", e.target.value)}
          placeholder="0.00"
        />
      </div>
    </div>

    <div className="flex justify-end space-x-3 pt-4 border-t">
      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={onSubmit} className="bg-blue-600 hover:bg-blue-700">
        {isEditing ? "Update" : "Add"} Payroll
      </Button>
    </div>
  </div>
);

// PayrollTable Component
const PayrollTable = ({ data, onEdit, calculateNetSalary }) => (
  <Card className="shadow-sm">
    <CardHeader className="border-b bg-gray-50/50">
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg">Payroll Records</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search employees..." className="pl-10 w-64" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>
    </CardHeader>
    <CardContent className="p-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Base Salary</TableHead>
            <TableHead>Adjustments</TableHead>
            <TableHead>Net Salary</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Month</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((payroll) => (
            <TableRow key={payroll.id} className="hover:bg-gray-50">
              <TableCell>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {payroll.employee_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-medium">{payroll.employee_name}</div>
                    <div className="text-sm text-gray-500">
                      ID: {payroll.employee_id}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">
                  ${payroll.salary_amount.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  {payroll.bank_account}
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  {payroll.bonus > 0 && (
                    <div className="flex items-center text-green-600 text-sm">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Bonus: ${payroll.bonus.toFixed(2)}
                    </div>
                  )}
                  {payroll.deduction > 0 && (
                    <div className="flex items-center text-red-600 text-sm">
                      <TrendingDown className="w-3 h-3 mr-1" />
                      Deduction: ${payroll.deduction.toFixed(2)}
                    </div>
                  )}
                  {payroll.bonus === 0 && payroll.deduction === 0 && (
                    <span className="text-gray-400 text-sm">
                      No adjustments
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="font-bold text-lg">
                  $
                  {calculateNetSalary(
                    payroll.salary_amount,
                    payroll.bonus,
                    payroll.deduction
                  ).toFixed(2)}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    payroll.payment_status === "paid"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                  }
                >
                  {payroll.payment_status}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {new Date(payroll.salary_month + "-01").toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                  }
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(payroll)}
                  >
                    <Edit3 className="w-3 h-3" />
                  </Button>
                  {payroll.slip_path && (
                    <Button variant="outline" size="sm">
                      <Download className="w-3 h-3" />
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Eye className="w-3 h-3" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// Main Payroll Component
export default function Payroll() {
  const [payrollData, setPayrollData] = useState([
    {
      id: 1,
      employee_id: 101,
      employee_name: "John Doe",
      salary_amount: 5000.0,
      bank_account: "****1234",
      payment_status: "paid",
      salary_month: "2024-01",
      slip_path: "/slips/john_jan_2024.pdf",
      bonus: 500.0,
      deduction: 200.0,
    },
    {
      id: 2,
      employee_id: 102,
      employee_name: "Jane Smith",
      salary_amount: 4500.0,
      bank_account: "****5678",
      payment_status: "pending",
      salary_month: "2024-01",
      slip_path: null,
      bonus: 300.0,
      deduction: 150.0,
    },
    {
      id: 3,
      employee_id: 103,
      employee_name: "Mike Johnson",
      salary_amount: 5500.0,
      bank_account: "****9012",
      payment_status: "paid",
      salary_month: "2024-01",
      slip_path: "/slips/mike_jan_2024.pdf",
      bonus: 0.0,
      deduction: 300.0,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPayroll, setEditingPayroll] = useState(null);
  const [formData, setFormData] = useState({
    employee_id: "",
    employee_name: "",
    salary_amount: "",
    bank_account: "",
    payment_status: "pending",
    salary_month: "",
    bonus: "",
    deduction: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (editingPayroll) {
      setPayrollData((prev) =>
        prev.map((item) =>
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
        slip_path: null,
      };
      setPayrollData((prev) => [...prev, newPayroll]);
    }
    closeModal();
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
      deduction: payroll.deduction,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPayroll(null);
    setFormData({
      employee_id: "",
      employee_name: "",
      salary_amount: "",
      bank_account: "",
      payment_status: "pending",
      salary_month: "",
      bonus: "",
      deduction: "",
    });
  };

  const calculateNetSalary = (salary, bonus, deduction) =>
    salary + bonus - deduction;

  // Calculate statistics
  const stats = {
    totalEmployees: payrollData.length,
    totalPaid: payrollData
      .filter((p) => p.payment_status === "paid")
      .reduce(
        (sum, p) =>
          sum + calculateNetSalary(p.salary_amount, p.bonus, p.deduction),
        0
      ),
    totalPending: payrollData
      .filter((p) => p.payment_status === "pending")
      .reduce(
        (sum, p) =>
          sum + calculateNetSalary(p.salary_amount, p.bonus, p.deduction),
        0
      ),
    currentMonth: "January 2024",
  };

  return (
    <div className="py-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Payroll Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage employee salaries, bonuses, and deductions
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Payroll
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          subtitle="Active payroll records"
          icon={Users}
          color="purple"
        />
        <StatCard
          title="Total Paid"
          value={`$${stats.totalPaid.toFixed(2)}`}
          subtitle="Completed payments"
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Pending Payments"
          value={`$${stats.totalPending.toFixed(2)}`}
          subtitle="Awaiting payment"
          icon={CreditCard}
          color="yellow"
        />
        <StatCard
          title="Current Period"
          value={stats.currentMonth}
          subtitle="Active payroll period"
          icon={Calendar}
          color="blue"
        />
      </div>

      {/* Payroll Table */}
      <PayrollTable
        data={payrollData}
        onEdit={handleEdit}
        calculateNetSalary={calculateNetSalary}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingPayroll ? "Edit Payroll" : "Add New Payroll"}
      >
        <PayrollForm
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          isEditing={!!editingPayroll}
        />
      </Modal>
    </div>
  );
}
