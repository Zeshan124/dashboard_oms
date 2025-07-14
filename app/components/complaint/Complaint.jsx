import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare,
  Clock,
  User,
  FileText,
} from "lucide-react";

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
  <tr
    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
    {...props}
  >
    {children}
  </tr>
);

const TableHead = ({ children, ...props }) => (
  <th
    className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
    {...props}
  >
    {children}
  </th>
);

const TableCell = ({ children, ...props }) => (
  <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0" {...props}>
    {children}
  </td>
);

export default function Complaint() {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      employee_id: 101,
      employee_name: "John Doe",
      subject: "Workplace Harassment",
      description:
        "I am experiencing inappropriate behavior from my supervisor. This includes unwanted comments and creating a hostile work environment. I would like this matter to be investigated promptly.",
      status: "pending",
      created_at: "2024-01-15",
      reviewed_by: null,
      reviewed_at: null,
    },
    {
      id: 2,
      employee_id: 102,
      employee_name: "Jane Smith",
      subject: "Overtime Payment Issue",
      description:
        "I have been working overtime for the past month, but my overtime hours are not being properly compensated according to company policy. I need clarification on this matter.",
      status: "approved",
      created_at: "2024-01-10",
      reviewed_by: "HR Manager",
      reviewed_at: "2024-01-12",
    },
    {
      id: 3,
      employee_id: 103,
      employee_name: "Mike Johnson",
      subject: "Equipment Malfunction",
      description:
        "My work computer has been malfunctioning for weeks, significantly impacting my productivity. Multiple IT requests have been ignored.",
      status: "unapproved",
      created_at: "2024-01-08",
      reviewed_by: "IT Manager",
      reviewed_at: "2024-01-14",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [editingComplaint, setEditingComplaint] = useState(null);
  const [formData, setFormData] = useState({
    employee_id: "",
    employee_name: "",
    subject: "",
    description: "",
    status: "pending",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (editingComplaint) {
      setComplaints((prev) =>
        prev.map((item) =>
          item.id === editingComplaint.id
            ? { ...item, ...formData, id: editingComplaint.id }
            : item
        )
      );
    } else {
      const newComplaint = {
        ...formData,
        id: complaints.length + 1,
        created_at: new Date().toISOString().split("T")[0],
        reviewed_by: null,
        reviewed_at: null,
      };
      setComplaints((prev) => [...prev, newComplaint]);
    }

    setIsDialogOpen(false);
    setEditingComplaint(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      employee_id: "",
      employee_name: "",
      subject: "",
      description: "",
      status: "pending",
    });
  };

  const handleEdit = (complaint) => {
    setEditingComplaint(complaint);
    setFormData({
      employee_id: complaint.employee_id,
      employee_name: complaint.employee_name,
      subject: complaint.subject,
      description: complaint.description,
      status: complaint.status,
    });
    setIsDialogOpen(true);
  };

  const handleView = (complaint) => {
    setSelectedComplaint(complaint);
    setViewDialogOpen(true);
  };

  const handleStatusChange = (complaintId, newStatus) => {
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === complaintId
          ? {
              ...complaint,
              status: newStatus,
              reviewed_by: "Current User",
              reviewed_at: new Date().toISOString().split("T")[0],
            }
          : complaint
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "unapproved":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-3 h-3" />;
      case "unapproved":
        return <XCircle className="w-3 h-3" />;
      case "pending":
        return <Clock className="w-3 h-3" />;
      default:
        return <AlertCircle className="w-3 h-3" />;
    }
  };

  const totalComplaints = complaints.length;
  const pendingComplaints = complaints.filter(
    (c) => c.status === "pending"
  ).length;
  const approvedComplaints = complaints.filter(
    (c) => c.status === "approved"
  ).length;
  const unapprovedComplaints = complaints.filter(
    (c) => c.status === "unapproved"
  ).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Complaint Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage employee complaints and feedback
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Submit Complaint
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingComplaint ? "Edit Complaint" : "Submit New Complaint"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employee_id">Employee ID</Label>
                  <Input
                    id="employee_id"
                    value={formData.employee_id}
                    onChange={(e) =>
                      handleInputChange("employee_id", e.target.value)
                    }
                    placeholder="101"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employee_name">Employee Name</Label>
                  <Input
                    id="employee_name"
                    value={formData.employee_name}
                    onChange={(e) =>
                      handleInputChange("employee_name", e.target.value)
                    }
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject/Title</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  placeholder="Brief description of the issue"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Complaint Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Provide detailed information about your complaint..."
                  rows={6}
                  className="resize-none"
                />
              </div>
              {editingComplaint && (
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleInputChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="unapproved">Unapproved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {editingComplaint ? "Update" : "Submit"} Complaint
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Complaints
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalComplaints}</div>
            <p className="text-xs text-muted-foreground">
              All time submissions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {pendingComplaints}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {approvedComplaints}
            </div>
            <p className="text-xs text-muted-foreground">
              Successfully resolved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unapproved</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {unapprovedComplaints}
            </div>
            <p className="text-xs text-muted-foreground">
              Rejected or dismissed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Complaints Table */}
      <Card>
        <CardHeader>
          <CardTitle>Complaint Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Reviewed By</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="font-medium">
                          {complaint.employee_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {complaint.employee_id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <div className="font-medium truncate">
                        {complaint.subject}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-sm">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {complaint.description.length > 100
                          ? `${complaint.description.substring(0, 100)}...`
                          : complaint.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${getStatusColor(
                        complaint.status
                      )} flex items-center space-x-1 w-fit`}
                    >
                      {getStatusIcon(complaint.status)}
                      <span className="capitalize">{complaint.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{complaint.created_at}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {complaint.reviewed_by ? (
                        <div>
                          <div className="font-medium">
                            {complaint.reviewed_by}
                          </div>
                          <div className="text-gray-500">
                            {complaint.reviewed_at}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">Not reviewed</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(complaint)}
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(complaint)}
                      >
                        <Edit3 className="w-3 h-3" />
                      </Button>
                      {complaint.status === "pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleStatusChange(complaint.id, "approved")
                            }
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleStatusChange(complaint.id, "unapproved")
                            }
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="w-3 h-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Complaint Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Complaint Details</DialogTitle>
          </DialogHeader>
          {selectedComplaint && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Employee
                  </Label>
                  <p className="text-sm mt-1">
                    {selectedComplaint.employee_name} (ID:{" "}
                    {selectedComplaint.employee_id})
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Status
                  </Label>
                  <div className="mt-1">
                    <Badge
                      className={`${getStatusColor(
                        selectedComplaint.status
                      )} flex items-center space-x-1 w-fit`}
                    >
                      {getStatusIcon(selectedComplaint.status)}
                      <span className="capitalize">
                        {selectedComplaint.status}
                      </span>
                    </Badge>
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">
                  Subject
                </Label>
                <p className="text-sm mt-1 font-medium">
                  {selectedComplaint.subject}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">
                  Description
                </Label>
                <p className="text-sm mt-1 text-gray-700 leading-relaxed">
                  {selectedComplaint.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Submitted On
                  </Label>
                  <p className="text-sm mt-1">{selectedComplaint.created_at}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Reviewed By
                  </Label>
                  <p className="text-sm mt-1">
                    {selectedComplaint.reviewed_by
                      ? `${selectedComplaint.reviewed_by} on ${selectedComplaint.reviewed_at}`
                      : "Not reviewed yet"}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
