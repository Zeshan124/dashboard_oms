import { getSession } from "next-auth/react"

export async function apiCall(url, options = {}) {
  const session = await getSession()
  
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (session?.accessToken) {
    headers.Authorization = `Bearer ${session.accessToken}`
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`)
  }

  return response.json()
}