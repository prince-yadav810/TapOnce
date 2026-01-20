/**
 * @file Admin Inbox Page
 * @description Notifications and messages for admin
 * 
 * @owner Dev 1
 */

import { Bell, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

const notifications = [
    {
        id: 1,
        title: 'New Order Received',
        description: 'Order #1005 from Tech Innovators Pvt Ltd needs approval.',
        time: '10 mins ago',
        type: 'info',
        read: false
    },
    {
        id: 2,
        title: 'Payout Request',
        description: 'Agent Prince Yadav requested a payout of ₹2,300.',
        time: '1 hour ago',
        type: 'warning',
        read: false
    },
    {
        id: 3,
        title: 'System Update',
        description: 'Scheduled maintenance completed successfully.',
        time: '2 hours ago',
        type: 'success',
        read: true
    }
]

export default function AdminInboxPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Inbox</h1>
                    <p className="text-muted-foreground">Manage your notifications and alerts</p>
                </div>
                <Button variant="outline">Mark all as read</Button>
            </div>

            <div className="bg-white rounded-xl border divide-y">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`p-4 flex gap-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50/50' : ''}`}
                    >
                        <div className={`mt-1 p-2 rounded-full h-fit
                            ${notification.type === 'info' ? 'bg-blue-100 text-blue-600' : ''}
                            ${notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' : ''}
                            ${notification.type === 'success' ? 'bg-green-100 text-green-600' : ''}
                        `}>
                            {notification.type === 'info' && <Bell className="w-5 h-5" />}
                            {notification.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                            {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                                    {notification.title}
                                </h3>
                                <span className="text-xs text-muted-foreground">{notification.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
