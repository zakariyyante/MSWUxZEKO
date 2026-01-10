'use client'

import { useSession, signOut } from 'next-auth/react'
import Dashboard from '@/components/Dashboard'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  const { data: session } = useSession()

  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="max-w-[1800px] mx-auto">
        <header className="mb-6 md:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-1 sm:mb-2">MSWUxZEKO Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Real-time marketing performance metrics</p>
            {session?.user?.email && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Signed in as: {session.user.email}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {session && (
              <button
                onClick={() => signOut()}
                className="text-xs sm:text-sm px-3 sm:px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
              >
                Sign Out
              </button>
            )}
          </div>
        </header>
        <Dashboard />
      </div>
    </main>
  )
}

