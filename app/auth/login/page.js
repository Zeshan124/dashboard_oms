"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  Eye,
  EyeOff,
  Shield,
  Zap,
  Star,
  ArrowRight,
  Lock,
  User,
  Mail,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid username or password. Please try again.");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("Login failed. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1334A5] via-[#011152] to-[#011152] min-h-screen  relative overflow-hidden">
      <div className="container">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating gradient orbs */}
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-[100px] animate-float-slow"></div>
          <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-pink-400/20 to-purple-600/20 rounded-full blur-[100px] animate-float-medium delay-1000"></div>
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-400/20 to-blue-600/20 rounded-full blur-[100px] animate-float-fast delay-500"></div>

          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.4 + 0.1,
              }}
            />
          ))}

          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTIwIDB2NDBNMCAyMGg0MCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvc3ZnPg==')]"></div>
        </div>

        <div className="relative z-10 min-h-screen flex">
          {/* Left Side - Hero Section */}
          <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-20">
            <div className="max-w-lg">
              {/* Premium Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8 hover:bg-white/20 transition-colors duration-300">
                <Sparkles className="w-4 h-4 text-yellow-300 mr-2 animate-pulse" />
                <span className="text-white/90 text-sm font-medium">
                  Enterprise Edition
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                Qist Bazaar
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  OMS
                </span>
              </h1>

              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Experience next-generation authentication with military-grade
                encryption and seamless performance.
              </p>

              {/* Feature highlights */}
              <div className="space-y-4 mb-12">
                <div className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/90 group-hover:text-white transition-colors">
                    256-bit AES encryption
                  </span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/90 group-hover:text-white transition-colors">
                    Instant authentication
                  </span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/90 group-hover:text-white transition-colors">
                    Intelligent threat detection
                  </span>
                </div>
              </div>

              {/* Stats with animation */}
              <div className="flex space-x-8">
                <div className="hover:scale-105 transition-transform">
                  <div className="text-3xl font-bold text-white flex items-end">
                    <span className="animate-count-up" data-count="99.9">
                      99.9
                    </span>
                    %
                  </div>
                  <div className="text-white/60 text-sm">Uptime SLA</div>
                </div>
                <div className="hover:scale-105 transition-transform">
                  <div className="text-3xl font-bold text-white flex items-end">
                    <span className="animate-count-up" data-count="50">
                      50
                    </span>
                    K+
                  </div>
                  <div className="text-white/60 text-sm">Global Users</div>
                </div>
                <div className="hover:scale-105 transition-transform">
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-white/60 text-sm">
                    Security Monitoring
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md">
              {/* Mobile header */}
              <div className="lg:hidden text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Secure Login
                </h2>
                <p className="text-white/80">
                  Enter your credentials to continue
                </p>
              </div>

              {/* Glass Card */}
              <Card className="bg-white/65 backdrop-blur-xl border-0 shadow-2xl shadow-black/30 hover:shadow-black/40 transition-shadow duration-300">
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform hover:scale-105 transition-transform">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Secure Sign In
                    </h3>
                    <p className="text-gray-600">
                      Enter your credentials to access your account
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 block">
                        Username
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <Input
                          type="text"
                          placeholder="Enter your username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="pl-12 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-200 bg-gray-50/50 hover:bg-white"
                          required
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 block">
                        Password
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-12 pr-12 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-200 bg-gray-50/50 hover:bg-white"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Remember & Forgot */}
                    {/* <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                        />
                        <div className="w-4 h-4 bg-gray-100 border-2 border-gray-300 rounded peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-colors">
                          <svg 
                            className="absolute top-0.5 left-0.5 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                      Forgot password?
                    </a>
                  </div> */}

                    {/* Error Message */}
                    {error && (
                      <Alert
                        variant="destructive"
                        className="border-red-200 bg-red-50 animate-fade-in"
                      >
                        <AlertDescription className="text-red-700">
                          {error}
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-100 group"
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
                          <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Footer Links */}
                  {/* <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                      Request access
                    </a>
                  </p>
                </div> */}
                </CardContent>
              </Card>

              {/* Trust indicators */}
              <div className="mt-8 text-center">
                <p className="text-white/70 text-xs mb-3">
                  TRUSTED BY INDUSTRY LEADERS
                </p>
                <div className="flex justify-center items-center space-x-6 opacity-80">
                  <svg
                    className="w-8 h-8 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0L8 8l-8 4 8 4 4 8 4-8 8-4-8-4-4-8z" />
                  </svg>
                  <svg
                    className="w-8 h-8 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 12l8-8 4 4-8 8-4-4z" />
                  </svg>
                  <svg
                    className="w-8 h-8 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0l4 8 8 4-8 4-4 8-4-8-8-4 8-4 4-8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Styles */}
        <style jsx global>{`
          @keyframes float-slow {
            0%,
            100% {
              transform: translate(0, 0) rotate(0deg);
            }
            50% {
              transform: translate(50px, 50px) rotate(5deg);
            }
          }
          @keyframes float-medium {
            0%,
            100% {
              transform: translate(0, 0) rotate(0deg);
            }
            50% {
              transform: translate(-30px, 30px) rotate(-3deg);
            }
          }
          @keyframes float-fast {
            0%,
            100% {
              transform: translate(0, 0) rotate(0deg);
            }
            50% {
              transform: translate(20px, -20px) rotate(2deg);
            }
          }
          @keyframes float {
            0% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-20px) translateX(10px);
            }
            100% {
              transform: translateY(0) translateX(0);
            }
          }
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-float-slow {
            animation: float-slow 15s ease-in-out infinite;
          }
          .animate-float-medium {
            animation: float-medium 12s ease-in-out infinite;
          }
          .animate-float-fast {
            animation: float-fast 9s ease-in-out infinite;
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
}
