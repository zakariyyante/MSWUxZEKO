import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

// Allowed Gmail accounts - Only these 4 can access the dashboard
const ALLOWED_EMAILS = [
  'musa@choixmedia.com',
  'musaefendi@gmail.com',
  'zakariyya.z@antetechnologies.com',
  'turgut.b@antetechnologies.com',
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

