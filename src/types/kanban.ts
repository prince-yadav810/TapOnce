export type OrderStatus =
    | 'pending_approval'
    | 'approved'
    | 'printing'
    | 'printed'
    | 'ready_to_ship'
    | 'shipped'
    | 'delivered'
    | 'paid'
    | 'rejected'
    | 'cancelled';

export interface KanbanOrder {
    id: string;
    orderNumber: number;
    customerName: string;
    status: OrderStatus;
    msp: number;
    salePrice: number;
    createdAt: string;
    designName?: string;
    agentId?: string;
    agentName?: string;
    isDirectSale?: boolean;
}

export interface KanbanColumn {
    id: OrderStatus;
    title: string;
    color: string;
}
