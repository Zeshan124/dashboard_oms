"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  Lock,
  User,
  XCircle,
} from "lucide-react";
export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setShowErrorPopup(false);
    try {
      const result = await signIn("credentials", {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });
      if (result?.error) {
        let msg = result.error;
        if (
          msg.toLowerCase().includes("credentials") ||
          msg.toLowerCase().includes("invalid")
        ) {
          msg = "Invalid username or password. Please try again.";
        }
        setErrorMessage(msg);
        setShowErrorPopup(true);
      } else {
        router.push("/dashboard");
      }
    } catch {
      setErrorMessage("Login failed. Please try again later.");
      setShowErrorPopup(true);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (urlError) {
      setErrorMessage(decodeURIComponent(urlError));
      setShowErrorPopup(true);
    }
  }, [urlError]);
  return (
    <>
      {" "}
      {/* Error Popup Modal */}{" "}
      {showErrorPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          {" "}
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-xs w-full relative animate-in fade-in duration-200">
            {" "}
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
              onClick={() => setShowErrorPopup(false)}
              aria-label="Close error popup"
            >
              {" "}
              <XCircle className="w-6 h-6" />{" "}
            </button>{" "}
            <div className="flex flex-col items-center gap-2">
              {" "}
              <div className="bg-red-100 rounded-full p-2 mb-2">
                {" "}
                <XCircle className="w-8 h-8 text-red-500" />{" "}
              </div>{" "}
              <div className="text-lg font-semibold text-red-700 text-center">
                {" "}
                Sign In Failed{" "}
              </div>{" "}
              <div className="text-sm text-gray-600 text-center">
                {" "}
                {errorMessage}{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
      <form onSubmit={handleSubmit} className="space-y-6">
        {" "}
        {/* Username */}{" "}
        <div className="space-y-2">
          {" "}
          <label className="text-sm font-semibold text-gray-700 block">
            {" "}
            Username{" "}
          </label>{" "}
          <div className="relative">
            {" "}
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />{" "}
            <Input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className="pl-12 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 bg-gray-50/50 hover:bg-white"
              required
            />{" "}
          </div>{" "}
        </div>{" "}
        {/* Password */}{" "}
        <div className="space-y-2">
          {" "}
          <label className="text-sm font-semibold text-gray-700 block">
            {" "}
            Password{" "}
          </label>{" "}
          <div className="relative">
            {" "}
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />{" "}
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="pl-12 pr-12 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 bg-gray-50/50 hover:bg-white"
              required
            />{" "}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {" "}
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}{" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
        {/* Submit */}{" "}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all group"
        >
          {" "}
          {loading ? (
            <>
              {" "}
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />{" "}
              Authenticating...{" "}
            </>
          ) : (
            <>
              {" "}
              <span className="group-hover:translate-x-1 transition-transform">
                {" "}
                Sign In{" "}
              </span>{" "}
              <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />{" "}
            </>
          )}{" "}
        </Button>{" "}
      </form>{" "}
    </>
  );
}
