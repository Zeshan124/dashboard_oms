"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginPage from "./auth/login/page";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl px-8 py-10 backdrop-blur-md">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <circle
              fill="#FF156D"
              stroke="#FF156D"
              stroke-width="15"
              r="15"
              cx="40"
              cy="100"
            >
              <animate
                attributeName="opacity"
                calcMode="spline"
                dur="2"
                values="1;0;1;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.4"
              ></animate>
            </circle>
            <circle
              fill="#FF156D"
              stroke="#FF156D"
              stroke-width="15"
              r="15"
              cx="100"
              cy="100"
            >
              <animate
                attributeName="opacity"
                calcMode="spline"
                dur="2"
                values="1;0;1;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.2"
              ></animate>
            </circle>
            <circle
              fill="#FF156D"
              stroke="#FF156D"
              stroke-width="15"
              r="15"
              cx="160"
              cy="100"
            >
              <animate
                attributeName="opacity"
                calcMode="spline"
                dur="2"
                values="1;0;1;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="0"
              ></animate>
            </circle>
          </svg>
          <div className="text-xl font-semibold text-gray-700 dark:text-gray-200 tracking-wide animate-pulse">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (session) {
    return null; // Will redirect to dashboard
  }

  return (
    <div>
      <LoginPage />
    </div>
  );
}
