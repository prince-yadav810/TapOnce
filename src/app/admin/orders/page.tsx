/**
 * @file Admin Orders Page
 * @description Kanban board for order management with filters and detail modal
 * 
 * @owner Dev 1
 */

import { KanbanBoard } from '@/components/admin/KanbanBoard';
import { KanbanColumn, KanbanOrder } from '@/types/kanban';

// Mock Data - will be replaced with Supabase queries
const columns: KanbanColumn[] = [
    { id: 'pending_approval', title: 'Pending Approval', color: '#fbbf24' },
    { id: 'approved', title: 'Approved', color: '#3b82f6' },
    { id: 'printing', title: 'Printing', color: '#a855f7' },
    { id: 'ready_to_ship', title: 'Ready to Ship', color: '#ec4899' },
    { id: 'shipped', title: 'Shipped', color: '#10b981' },
    { id: 'delivered', title: 'Delivered', color: '#6366f1' },
];

const agents = [
    { id: 'agent-1', fullName: 'Prince Yadav', referralCode: 'PRINCE10' },
    { id: 'agent-2', fullName: 'Rahul Sharma', referralCode: 'RAHUL20' },
];

const initialOrders: KanbanOrder[] = [
    {
        id: '1',
        orderNumber: 1001,
        customerName: 'Rahul Verma',
        status: 'pending_approval',
        msp: 600,
        salePrice: 999,
        createdAt: new Date().toISOString(),
        designName: 'Vertical Blue Premium',
        agentId: 'agent-1',
        agentName: 'Prince Yadav'
    },
    {
        id: '2',
        orderNumber: 1002,
        customerName: 'Priya Singh',
        status: 'approved',
        msp: 800,
        salePrice: 1299,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        designName: 'Horizontal Gold Elite',
        agentId: 'agent-2',
        agentName: 'Rahul Sharma'
    },
    {
        id: '3',
        orderNumber: 1003,
        customerName: 'Amit Shah',
        status: 'printing',
        msp: 500,
        salePrice: 650,
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        designName: 'Minimal White',
        agentId: 'agent-1',
        agentName: 'Prince Yadav'
    },
    {
        id: '4',
        orderNumber: 1004,
        customerName: 'Eco Corp',
        status: 'pending_approval',
        msp: 600,
        salePrice: 500, // Below MSP
        createdAt: new Date().toISOString(),
        designName: 'Vertical Blue Premium',
        isDirectSale: true
    },
    {
        id: '5',
        orderNumber: 1005,
        customerName: 'Tech Innovators Pvt Ltd',
        status: 'ready_to_ship',
        msp: 700,
        salePrice: 1100,
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        designName: 'Dark Mode Professional',
        agentId: 'agent-2',
        agentName: 'Rahul Sharma'
    },
    {
        id: '6',
        orderNumber: 1006,
        customerName: 'Neha Gupta',
        status: 'shipped',
        msp: 600,
        salePrice: 899,
        createdAt: new Date(Date.now() - 345600000).toISOString(),
        designName: 'Vertical Blue Premium',
        agentId: 'agent-1',
        agentName: 'Prince Yadav'
    }
];

// Mock handlers - will connect to Supabase
async function handleOrderUpdate(orderId: string, status: string) {
    console.log('Updating order', orderId, 'to status', status);
    // TODO: Call Supabase to update order status
}

async function handleOrderApprove(orderId: string) {
    console.log('Approving order', orderId);
    // TODO: Call Supabase to approve order and generate portfolio slug
}

async function handleOrderReject(orderId: string, reason: string) {
    console.log('Rejecting order', orderId, 'with reason:', reason);
    // TODO: Call Supabase to reject order with reason
}

export default function AdminOrdersPage() {
    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] p-4 md:p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Order Board</h1>
                    <p className="text-muted-foreground">Manage orders via drag-and-drop. Click a card to view details.</p>
                </div>
            </div>

            <div className="flex-1 overflow-auto bg-muted/10 rounded-xl border p-4">
                <KanbanBoard
                    initialColumns={columns}
                    initialOrders={initialOrders}
                    agents={agents}
                />
            </div>
        </div>
    );
}
