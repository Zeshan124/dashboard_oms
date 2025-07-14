"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AddEmployee() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [serverResp, setServerResp] = useState(null);

  // Form submit
  const onSubmit = async (data) => {
    try {
      // 👇 Yahan future me backend end‑point call hoga
      // const res = await fetch("/api/employees", { method: "POST", body: JSON.stringify(data) });
      // const json = await res.json();
      // setServerResp(json.message);
      console.log("New Employee:", data);
      setServerResp("Employee successfully added (dummy response)");
      reset(); // clear form
    } catch (err) {
      console.error(err);
      setServerResp("Kuch ghalat ho gaya! Try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">All Employees</h1>
          <p className="text-gray-600 mt-1">
            Manage and view all employees in your organization
          </p>
        </div>
        {/* <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Add Employee
          </Button>
        </div> */}
      </div>
      <Card className="max-w-full mx-auto mt-6 py-2 lg:py-2">
        {/* <CardHeader>
        <CardTitle>Add New Employee</CardTitle>
      </CardHeader> */}

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* --- Personal Info --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 font-medium">Full Name</label>
                <Input
                  placeholder="Sarah Johnson"
                  {...register("name", { required: "Name required" })}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="sarah@example.com"
                  {...register("email", {
                    required: "Email required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">CNIC Number</label>
                <Input
                  placeholder="42101-1234567-9"
                  {...register("cnic", {
                    required: "CNIC required",
                    pattern: {
                      value: /^[0-9]{5}-[0-9]{7}-[0-9]$/i,
                      message: "Invalid CNIC format",
                    },
                  })}
                />
                {errors.cnic && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.cnic.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">Phone</label>
                <Input
                  placeholder="+1 (555) 123‑4567"
                  {...register("phone", { required: "Phone required" })}
                />
              </div>
              <div>
                <div>
                  <label className="block mb-1 font-medium">Location</label>
                  <Input placeholder="New York, NY" {...register("location")} />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">Status</label>
                <Select {...register("status", { required: true })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-red-600 text-sm mt-1">
                    Status is required
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Date of Birth</label>
                <Input
                  type="date"
                  {...register("dob", { required: "Date of birth required" })}
                />
                {errors.dob && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.dob.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">Join Date</label>
                <Input
                  type="date"
                  {...register("joinDate", { required: "Join date required" })}
                />
                {errors.joinDate && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.joinDate.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Leave Date</label>
                <Input type="date" {...register("leaveDate")} />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  CNIC Front Image
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  {...register("cnicFront", {
                    required: "CNIC front image required",
                  })}
                />
                {errors.cnicFront && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.cnicFront.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  CNIC Back Image
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  {...register("cnicBack", {
                    required: "CNIC back image required",
                  })}
                />
                {errors.cnicBack && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.cnicBack.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Offer Letter (PDF)
                </label>
                <Input
                  type="file"
                  accept="application/pdf"
                  {...register("offerLetter", {
                    required: "Offer letter PDF required",
                  })}
                />
                {errors.offerLetter && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.offerLetter.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Resume (PDF)</label>
                <Input
                  type="file"
                  accept="application/pdf"
                  {...register("resume", { required: "Resume PDF required" })}
                />
                {errors.resume && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.resume.message}
                  </p>
                )}
              </div>
            </div>
            {/* --- Employment Info --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">
                  Position / Title
                </label>
                <Input
                  placeholder="Senior Software Engineer"
                  {...register("position", { required: "Position required" })}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Department</label>
                <Select {...register("department", { required: true })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="HR">Human Resources</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
                {errors.department && (
                  <p className="text-red-600 text-sm mt-1">
                    Department chahiye
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Responsibilities</label>
              <Textarea
                rows={3}
                placeholder="Write Your responsibilities..."
                {...register("notes")}
              />
            </div>

            {/* --- Bank Details --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Bank Name</label>
                <Input placeholder="Chase Bank" {...register("bankName")} />
              </div>
              <div>
                <label className="block mb-1 font-medium">Account #</label>
                <Input placeholder="123456789" {...register("accountNo")} />
              </div>
            </div>

            {/* --- Payroll --- */}
            {/* <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium">Basic Salary ($)</label>
              <Input type="number" {...register("basic")} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Allowances ($)</label>
              <Input type="number" {...register("allowances")} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Deductions ($)</label>
              <Input type="number" {...register("deductions")} />
            </div>
          </div> */}

            {/* --- Notes --- */}
            {/* <div>
            <label className="block mb-1 font-medium">Notes</label>
            <Textarea
              rows={3}
              placeholder="Kuch extra details likh dein..."
              {...register("notes")}
            />
          </div> */}

            {/* --- Submit --- */}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Add Employee"}
            </Button>

            {serverResp && <p className="text-green-600 mt-2">{serverResp}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
