import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        try {
          const response = await fetch("https://boms.qistbazaar.pk/api/user/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          })

          if (!response.ok) {
            return null
          }

          const data = await response.json()

          if (data.token) {
            return {
              id: data.userId.toString(),
              name: data.userName,
              email: data.userName, // Using username as email since no email in response
              token: data.token,
              roleID: data.roleID,
              role: data.role,
              branchID: data.branchID,
              branchName: data.branchName,
              branchCode: data.branchCode,
              branchCodeAlias: data.branchCodeAlias,
              storeBranch: data.storeBranch,
            }
          }

          return null
        } catch (error) {
          console.error("Login error:", error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Store the JWT token and user data in the JWT token
      if (user) {
        token.accessToken = user.token
        token.roleID = user.roleID
        token.role = user.role
        token.branchID = user.branchID
        token.branchName = user.branchName
        token.branchCode = user.branchCode
        token.branchCodeAlias = user.branchCodeAlias
        token.storeBranch = user.storeBranch
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client
      session.accessToken = token.accessToken
      session.user.roleID = token.roleID
      session.user.role = token.role
      session.user.branchID = token.branchID
      session.user.branchName = token.branchName
      session.user.branchCode = token.branchCode
      session.user.branchCodeAlias = token.branchCodeAlias
      session.user.storeBranch = token.storeBranch
      return session
    }
  },
  pages: {
    signIn: "/auth/login", // Custom login page
  },
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }