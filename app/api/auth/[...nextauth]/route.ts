import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

// Allowed Gmail accounts - EDIT THESE 3 EMAILS
const ALLOWED_EMAILS = [
  'your-email1@gmail.com',
  'your-email2@gmail.com',
  'your-email3@gmail.com',
]

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Only allow specific Gmail accounts
      const email = user.email?.toLowerCase()
      if (email && ALLOWED_EMAILS.includes(email)) {
        return true
      }
      return false
    },
    async session({ session, token }) {
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }

