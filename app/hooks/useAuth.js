"use client";

import { useSession } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    token: session?.accessToken,
    roleID: session?.user?.roleID,
    role: session?.user?.role,
    branchID: session?.user?.branchID,
    branchName: session?.user?.branchName,
    branchCode: session?.user?.branchCode,
    branchCodeAlias: session?.user?.branchCodeAlias,
    storeBranch: session?.user?.storeBranch,
    isLoading: status === "loading",
    isAuthenticated: !!session,
  };
}
