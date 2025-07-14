import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Star, Lock, Sparkles } from "lucide-react";
import { Suspense } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function LoginPage() {
  return (
    <div className="bg-gradient-to-br from-[#1334A5] via-[#011152] to-[#011152] min-h-screen relative overflow-hidden">
      <div className="container">
        <div className="absolute inset-0 overflow-hidden">
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
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTIwIDB2NDBNMCAyMGg0MCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvc3ZnPg==')]"></div>
        </div>
        <div className="relative z-10 min-h-screen flex">
          {/* Left Side - Hero Section */}
          <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-0">
            <div className="max-w-full">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8 hover:bg-white/20 transition-colors duration-300">
                <Sparkles className="w-4 h-4 text-yellow-300 mr-2 animate-pulse" />
                <span className="text-white/90 text-sm font-medium">
                  Enterprise Edition
                </span>
              </div>
              <h1 className="text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                Qist Bazaar
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  HR Management Portal
                </span>
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Experience next-generation authentication with military-grade
                encryption and seamless performance.
              </p>
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
          <div className="w-full lg:w-1/2 flex items-center justify-center px-1 py-12">
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

              <Card className="bg-white/65 backdrop-blur-xl border-0 shadow-2xl shadow-black/30 hover:shadow-black/40 transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform hover:scale-105 transition-transform">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Secure Login
                    </h3>
                    <p className="text-gray-600">
                      Enter your credentials to access your account
                    </p>
                  </div>
                  <Suspense>
                    <LoginForm />
                  </Suspense>
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
      </div>
    </div>
  );
}