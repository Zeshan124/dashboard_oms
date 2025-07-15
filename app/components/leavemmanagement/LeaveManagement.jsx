import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const LeaveManagement = () => {
  // Dummy data for leave requests
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      employeeName: "John Doe",
      leaveType: "Annual",
      startDate: "2024-08-15",
      endDate: "2024-08-20",
      days: 5,
      reason: "Family vacation",
      status: "Approved",
      appliedOn: "2024-08-01",
      approvedBy: "Manager Smith",
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      leaveType: "Sick",
      startDate: "2024-08-10",
      endDate: "2024-08-12",
      days: 3,
      reason: "Flu symptoms",
      status: "Pending",
      appliedOn: "2024-08-09",
      approvedBy: null,
    },
    {
      id: 3,
      employeeName: "Mike Johnson",
      leaveType: "Casual",
      startDate: "2024-08-18",
      endDate: "2024-08-18",
      days: 1,
      reason: "Personal work",
      status: "Rejected",
      appliedOn: "2024-08-17",
      approvedBy: "Manager Smith",
    },
    {
      id: 4,
      employeeName: "Sarah Wilson",
      leaveType: "Annual",
      startDate: "2024-09-01",
      endDate: "2024-09-10",
      days: 10,
      reason: "Wedding ceremony",
      status: "Pending",
      appliedOn: "2024-08-15",
      approvedBy: null,
    },
  ]);

  // Leave types configuration
  const leaveTypes = {
    Annual: { color: "bg-blue-100 text-blue-800", limit: 25 },
    Sick: { color: "bg-red-100 text-red-800", limit: 10 },
    Casual: { color: "bg-green-100 text-green-800", limit: 12 },
  };

  // State for form and filters
  const [showForm, setShowForm] = useState(false);
  const [editingLeave, setEditingLeave] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterLeaveType, setFilterLeaveType] = useState("All");

  const [formData, setFormData] = useState({
    employeeName: "",
    leaveType: "Annual",
    startDate: "",
    endDate: "",
    reason: "",
  });

  // Replace dummy data with API calls
  // const fetchLeaveRequests = async () => {
  //   const response = await fetch('/api/leave-requests');
  //   return response.json();
  // };

  // const submitLeaveRequest = async (leaveData) => {
  //   const response = await fetch('/api/leave-requests', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(leaveData)
  //   });
  //   return response.json();
  // };

  // Calculate days between dates
  const calculateDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (
      !formData.employeeName ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.reason
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const days = calculateDays(formData.startDate, formData.endDate);

    const newLeave = {
      id: editingLeave ? editingLeave.id : Date.now(),
      ...formData,
      days,
      status: "Pending",
      appliedOn: new Date().toISOString().split("T")[0],
      approvedBy: null,
    };

    if (editingLeave) {
      setLeaveRequests((prev) =>
        prev.map((leave) => (leave.id === editingLeave.id ? newLeave : leave))
      );
    } else {
      setLeaveRequests((prev) => [...prev, newLeave]);
    }

    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      employeeName: "",
      leaveType: "Annual",
      startDate: "",
      endDate: "",
      reason: "",
    });
    setShowForm(false);
    setEditingLeave(null);
  };

  // Handle edit
  const handleEdit = (leave) => {
    setEditingLeave(leave);
    setFormData({
      employeeName: leave.employeeName,
      leaveType: leave.leaveType,
      startDate: leave.startDate,
      endDate: leave.endDate,
      reason: leave.reason,
    });
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = (id) => {
    setLeaveRequests((prev) => prev.filter((leave) => leave.id !== id));
  };

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setLeaveRequests((prev) =>
      prev.map((leave) =>
        leave.id === id
          ? {
              ...leave,
              status: newStatus,
              approvedBy: newStatus !== "Pending" ? "Manager Smith" : null,
            }
          : leave
      )
    );
  };

  // Filter leaves
  const filteredLeaves = leaveRequests.filter((leave) => {
    const statusMatch = filterStatus === "All" || leave.status === filterStatus;
    const typeMatch =
      filterLeaveType === "All" || leave.leaveType === filterLeaveType;
    return statusMatch && typeMatch;
  });

  // Get status badge
  const getStatusBadge = (status) => {
    const statusColors = {
      Pending: "bg-yellow-100 text-yellow-800",
      Approved: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="max-w-full mx-auto py-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-600 mt-1">
            Manage employee leave requests and approvals
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Leave Request
        </Button>
      </div>
      <div className="py-5">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {showForm && (
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {editingLeave ? "Edit Leave Request" : "New Leave Request"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee Name
                  </label>
                  <input
                    type="text"
                    value={formData.employeeName}
                    onChange={(e) =>
                      setFormData({ ...formData, employeeName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Leave Type
                  </label>
                  <select
                    value={formData.leaveType}
                    onChange={(e) =>
                      setFormData({ ...formData, leaveType: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.keys(leaveTypes).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason
                  </label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) =>
                      setFormData({ ...formData, reason: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Please provide a reason for your leave..."
                    required
                  />
                </div>

                {formData.startDate && formData.endDate && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">
                      Total Days:{" "}
                      <span className="font-semibold">
                        {calculateDays(formData.startDate, formData.endDate)}
                      </span>
                    </p>
                  </div>
                )}

                <div className="md:col-span-2 flex gap-2">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    {editingLeave ? "Update Request" : "Submit Request"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Filters:
                </span>
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>

              <select
                value={filterLeaveType}
                onChange={(e) => setFilterLeaveType(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Types</option>
                {Object.keys(leaveTypes).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <div className="text-sm text-gray-600">
                Showing {filteredLeaves.length} of {leaveRequests.length}{" "}
                requests
              </div>
            </div>
          </div>

          {/* Leave Requests Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Leave Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied On
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeaves.map((leave) => (
                  <tr key={leave.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {leave.employeeName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          leaveTypes[leave.leaveType].color
                        }`}
                      >
                        {leave.leaveType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {leave.startDate} to {leave.endDate}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {leave.days} day{leave.days > 1 ? "s" : ""}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className="text-sm text-gray-900 max-w-xs truncate"
                        title={leave.reason}
                      >
                        {leave.reason}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                          leave.status
                        )}`}
                      >
                        {leave.status}
                      </span>
                      {leave.approvedBy && (
                        <div className="text-xs text-gray-500 mt-1">
                          by {leave.approvedBy}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {leave.appliedOn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(leave)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(leave.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {leave.status === "Pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(leave.id, "Approved")
                              }
                              className="text-green-600 hover:text-green-900 p-1 rounded"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(leave.id, "Rejected")
                              }
                              className="text-red-600 hover:text-red-900 p-1 rounded"
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLeaves.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No leave requests found matching your filters.
              </p>
            </div>
          )}

          {/* Summary Statistics */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {leaveRequests.length}
                </div>
                <div className="text-sm text-gray-500">Total Requests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {leaveRequests.filter((l) => l.status === "Pending").length}
                </div>
                <div className="text-sm text-gray-500">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {leaveRequests.filter((l) => l.status === "Approved").length}
                </div>
                <div className="text-sm text-gray-500">Approved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {leaveRequests.filter((l) => l.status === "Rejected").length}
                </div>
                <div className="text-sm text-gray-500">Rejected</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
