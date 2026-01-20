/**
 * @file Admin Layout
 * @description Layout wrapper for all admin pages with sidebar
 * 
 * @owner Dev 1
 * @module admin
 */

'use client'

import { ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LogOut, Bell, Home, ChevronRight, LayoutDashboard, ShoppingCart, Users, UserCog, Wallet, Grid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AdminLayout({ children }: { children: ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()

    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    // Breadcrumb logic
    const getBreadcrumbs = () => {
        const paths = pathname.split('/').filter(Boolean)
        // paths[0] is 'admin'

        const breadcrumbs = [
            { label: 'Dashboard', href: '/admin', active: paths.length === 1 }
        ]

        if (paths.length > 1) {
            const pageName = paths[1].charAt(0).toUpperCase() + paths[1].slice(1)
            let formattedName = pageName

            // Custom naming mapping
            if (paths[1] === 'orders') formattedName = 'Order Board'

            breadcrumbs.push({
                label: formattedName,
                href: `/admin/${paths[1]}`,
                active: true
            })
        }

        return breadcrumbs
    }

    const breadcrumbs = getBreadcrumbs()

    const navItems = [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/orders', label: 'Order Board', icon: ShoppingCart },
        { href: '/admin/customers', label: 'Customers', icon: Users },
        { href: '/admin/agents', label: 'Agents', icon: UserCog },
        { href: '/admin/finance', label: 'Finance', icon: Wallet },
        { href: '/admin/catalog', label: 'Catalog', icon: Grid },
        { href: '/admin/inbox', label: 'Inbox', icon: Bell },
    ]

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg flex flex-col shrink-0 sticky top-0 h-screen">
                <div className="p-4">
                    <h2 className="text-xl font-bold text-blue-600">TapOnce</h2>
                    <p className="text-xs text-gray-500">Admin Panel</p>
                </div>
                <nav className="mt-4 px-2 space-y-1 flex-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                {/* Logout Button at Bottom */}
                <div className="p-4 border-t">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 min-w-0">
                {/* Header */}
                <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-20">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center text-sm text-gray-500">
                        <Link href="/admin" className="hover:text-blue-600 flex items-center gap-1">
                            <Home className="w-4 h-4" />
                        </Link>
                        {breadcrumbs.map((item, index) => (
                            <div key={item.href} className="flex items-center">
                                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                                {item.active ? (
                                    <span className="font-semibold text-gray-900">{item.label}</span>
                                ) : (
                                    <Link href={item.href} className="hover:text-blue-600">
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </header>

                {/* Page content */}
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}
