"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, ArrowRight, Loader2, Lock, User } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        router.push("/auth/login?error=" + encodeURIComponent(result.error));
      } else {
        router.push("/dashboard");
      }
    } catch {
      router.push("/auth/login?error=" + encodeURIComponent("Login failed"));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Username */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 block">
          Username 
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            className="pl-12 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 bg-gray-50/50 hover:bg-white"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 block">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="pl-12 pr-12 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 bg-gray-50/50 hover:bg-white"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <Alert variant="destructive" className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-700">
            {decodeURIComponent(error)}
          </AlertDescription>
        </Alert>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all group"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Authenticating...
          </>
        ) : (
          <>
            <span className="group-hover:translate-x-1 transition-transform">
              Sign In
            </span>
            <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
          </>
        )}
      </Button>
    </form>
  );
}
