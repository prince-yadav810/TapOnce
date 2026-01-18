/**
 * @file Admin Layout
 * @description Layout wrapper for all admin pages with sidebar
 * 
 * @owner Dev 1
 * @module admin
 * 
 * FEATURES:
 * - Sidebar navigation
 * - Header with notifications
 * - Auth protection (admin only)
 */

import { ReactNode } from 'react'

// TODO: Import auth check
// import { requireAdmin } from '@/lib/auth'

export default function AdminLayout({ children }: { children: ReactNode }) {
    // TODO: Add auth check
    // await requireAdmin()

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg">
                {/* 
          TODO: Implement AdminSidebar component
          - Logo
          - Navigation items from config/navigation.ts
          - User info at bottom
          - Logout button
        */}
                <div className="p-4">
                    <h2 className="text-xl font-bold text-blue-600">TapOnce</h2>
                    <p className="text-xs text-gray-500">Admin Panel</p>
                </div>
                <nav className="mt-4 px-2 space-y-1">
                    <a href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                        Dashboard
                    </a>
                    <a href="/admin/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                        Order Board
                    </a>
                    <a href="/admin/customers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                        Customers
                    </a>
                    <a href="/admin/agents" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                        Agents
                    </a>
                    <a href="/admin/finance" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                        Finance
                    </a>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1">
                {/* Header */}
                <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                    <h1 className="text-lg font-semibold">Admin Dashboard</h1>
                    {/* TODO: Add notification bell, user menu */}
                </header>

                {/* Page content */}
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}
