/**
 * @file Admin Layout
 * @description Layout wrapper for all admin pages with sidebar
 * 
 * @owner Dev 1
 * @module admin
 */

'use client'

import { ReactNode, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LogOut, Bell, Home, ChevronRight, LayoutDashboard, ShoppingCart, Users, UserCog, Wallet, Grid, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AdminLayout({ children }: { children: ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

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
            <aside
                className={`${isSidebarOpen ? 'w-56' : 'w-20'} bg-white shadow-lg flex flex-col shrink-0 sticky top-0 h-screen transition-all duration-300 z-30`}
            >
                <div className={`p-4 h-16 flex items-center ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
                    <h2 className={`text-xl font-bold text-blue-600 transition-opacity duration-200 ${!isSidebarOpen && 'hidden opacity-0'}`}>TapOnce</h2>
                    {!isSidebarOpen && <span className="text-xl font-bold text-blue-600">TO</span>}
                    <p className={`text-xs text-gray-500 ml-2 ${!isSidebarOpen && 'hidden'}`}>Admin</p>
                </div>

                <nav className="mt-4 px-2 space-y-1 flex-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center ${isSidebarOpen ? 'px-4' : 'justify-center px-2'} py-3 text-sm font-medium rounded-md transition-colors whitespace-nowrap overflow-hidden ${isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                title={!isSidebarOpen ? item.label : undefined}
                            >
                                <item.icon className={`w-5 h-5 flex-shrink-0 ${isSidebarOpen ? 'mr-3' : ''}`} />
                                <span className={`transition-opacity duration-200 ${!isSidebarOpen ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
                                    {item.label}
                                </span>
                            </Link>
                        )
                    })}
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 min-w-0 transition-all duration-300">
                {/* Header */}
                <header className="bg-white shadow-sm px-4 py-4 flex justify-between items-center sticky top-0 z-20 h-16">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="text-gray-500 hover:bg-gray-100 flex-shrink-0"
                        >
                            {isSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
                        </Button>

                        {/* Breadcrumbs */}
                        <nav className="flex items-center text-sm text-gray-500 overflow-x-auto no-scrollbar">
                            <Link href="/admin" className="hover:text-blue-600 flex items-center gap-1">
                                <Home className="w-4 h-4" />
                            </Link>
                            {breadcrumbs.map((item, index) => (
                                <div key={item.href} className="flex items-center whitespace-nowrap">
                                    <ChevronRight className="w-4 h-4 mx-2 text-gray-400 flex-shrink-0" />
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
                    </div>

                    <div className="flex items-center gap-2 pl-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50 whitespace-nowrap"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">Logout</span>
                        </Button>
                    </div>
                </header>

                {/* Page content */}
                <div className="p-4 md:p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}
