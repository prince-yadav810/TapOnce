'use client';

/**
 * @file Kanban Board Component
 * @description Main Kanban board with drag-and-drop, modal, and filters
 * 
 * @owner Dev 1
 */

import {
    DndContext,
    DragOverlay,
    useSensors,
    useSensor,
    PointerSensor,
    DragStartEvent,
    DragEndEvent,
    DragOverEvent,
    closestCorners
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { useState, useEffect, useMemo } from 'react';
import { KanbanColumn as IKanbanColumn, KanbanOrder, OrderStatus } from '@/types/kanban';
import { Order } from '@/types/order';
import { KanbanColumn } from './KanbanColumn';
import { OrderCard } from './OrderCard';
import { OrderDetailModal } from './OrderDetailModal';
import { OrderFilters } from './OrderFilters';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Agent {
    id: string;
    fullName: string;
    referralCode: string;
}

interface KanbanBoardProps {
    initialColumns: IKanbanColumn[];
    initialOrders: KanbanOrder[];
    agents?: Agent[];
    onOrderUpdate?: (orderId: string, status: OrderStatus) => Promise<void>;
    onOrderApprove?: (orderId: string) => Promise<void>;
    onOrderReject?: (orderId: string, reason: string) => Promise<void>;
}

// Convert KanbanOrder to Order for the modal
function kanbanToOrder(kanbanOrder: KanbanOrder): Order {
    return {
        id: kanbanOrder.id,
        orderNumber: kanbanOrder.orderNumber,
        customerName: kanbanOrder.customerName,
        customerPhone: '',
        customerEmail: '',
        cardDesign: {
            id: '',
            name: kanbanOrder.designName || 'Standard Design',
            previewUrl: ''
        },
        cardDesignId: '',
        mspAtOrder: kanbanOrder.msp,
        salePrice: kanbanOrder.salePrice,
        commissionAmount: Math.max(0, kanbanOrder.salePrice - kanbanOrder.msp),
        overrideCommission: 0,
        status: kanbanOrder.status,
        paymentStatus: 'pending',
        isDirectSale: kanbanOrder.isDirectSale || false,
        isBelowMsp: kanbanOrder.salePrice < kanbanOrder.msp,
        createdAt: kanbanOrder.createdAt,
        updatedAt: kanbanOrder.createdAt,
        agent: kanbanOrder.agentName ? {
            id: kanbanOrder.agentId || '',
            fullName: kanbanOrder.agentName,
            referralCode: ''
        } : undefined
    };
}

export function KanbanBoard({
    initialColumns,
    initialOrders,
    agents = [],
    onOrderUpdate,
    onOrderApprove,
    onOrderReject
}: KanbanBoardProps) {
    const [columns] = useState<IKanbanColumn[]>(initialColumns);
    const [orders, setOrders] = useState<KanbanOrder[]>(initialOrders);
    const [activeOrder, setActiveOrder] = useState<KanbanOrder | null>(null);

    // Modal state
    const [selectedOrder, setSelectedOrder] = useState<KanbanOrder | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Confirmation Modal State
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [pendingDrag, setPendingDrag] = useState<{ activeId: string, overId: string, originalStatus: OrderStatus } | null>(null);
    // Track original status to compare against final drop column
    const [startStatus, setStartStatus] = useState<OrderStatus | null>(null);

    // Filter state
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

    // DnD Sensors
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3, // 3px movement required before drag starts
            },
        })
    );

    // Filtered orders
    const filteredOrders = useMemo(() => {
        let result = orders;

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(order =>
                order.customerName.toLowerCase().includes(query) ||
                order.orderNumber.toString().includes(query)
            );
        }

        // Agent filter
        if (selectedAgent) {
            if (selectedAgent === 'direct') {
                result = result.filter(order => order.isDirectSale === true);
            } else {
                result = result.filter(order => order.agentId === selectedAgent);
            }
        }

        return result;
    }, [orders, searchQuery, selectedAgent]);

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === 'Order') {
            const order = event.active.data.current.order;
            setActiveOrder(order);
            setStartStatus(order.status); // Save original status
        }
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveAOrder = active.data.current?.type === 'Order';
        const isOverAOrder = over.data.current?.type === 'Order';
        const isOverAColumn = over.data.current?.type === 'Column';

        if (!isActiveAOrder) return;

        // Dragging an Order over another Order
        if (isActiveAOrder && isOverAOrder) {
            setOrders((orders) => {
                const activeIndex = orders.findIndex((t) => t.id === activeId);
                const overIndex = orders.findIndex((t) => t.id === overId);

                if (orders[activeIndex].status !== orders[overIndex].status) {
                    // Update status for visual feedback only
                    orders[activeIndex].status = orders[overIndex].status;
                    return arrayMove(orders, activeIndex, overIndex - 1);
                }

                return arrayMove(orders, activeIndex, overIndex);
            });
        }

        // Dragging an Order over a Column
        if (isActiveAOrder && isOverAColumn) {
            setOrders((orders) => {
                const activeIndex = orders.findIndex((t) => t.id === activeId);
                if (orders[activeIndex].status !== overId) {
                    // Update status for visual feedback only
                    orders[activeIndex].status = overId as OrderStatus;
                    return arrayMove(orders, activeIndex, activeIndex);
                }
                return orders;
            });
        }
    }

    async function onDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        setActiveOrder(null);

        if (!over || !startStatus) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        // Determine target status
        let targetStatus: OrderStatus;
        if (over.data.current?.type === 'Column') {
            targetStatus = overId as OrderStatus;
        } else if (over.data.current?.type === 'Order') {
            targetStatus = over.data.current.order.status;
        } else {
            return;
        }

        // Compare original status with target status
        if (startStatus === targetStatus) {
            setStartStatus(null);
            return; // No status change, just reordering within same column
        }

        // Status changed: Trigger Confirmation
        setPendingDrag({
            activeId,
            overId: targetStatus,
            originalStatus: startStatus
        });
        setConfirmModalOpen(true);
        // Do NOT nullify startStatus yet; needed for revert if cancelled
    }

    const handleConfirmDrag = async () => {
        if (pendingDrag && onOrderUpdate) {
            await onOrderUpdate(pendingDrag.activeId, pendingDrag.overId as OrderStatus);
        }
        setConfirmModalOpen(false);
        setPendingDrag(null);
        setStartStatus(null);
    };

    const handleCancelDrag = () => {
        if (pendingDrag && startStatus) {
            // Revert the order status in local state
            setOrders(orders => orders.map(o => {
                if (o.id === pendingDrag.activeId) {
                    return { ...o, status: startStatus };
                }
                return o;
            }));
        }
        setConfirmModalOpen(false);
        setPendingDrag(null);
        setStartStatus(null);
    };

    const handleOrderClick = (order: KanbanOrder) => {
        setSelectedOrder(order);
        setModalOpen(true);
    };

    const handleApprove = async (orderId: string) => {
        if (onOrderApprove) {
            await onOrderApprove(orderId);
        }
        // Update local state
        setOrders(orders => orders.map(o =>
            o.id === orderId ? { ...o, status: 'approved' as OrderStatus } : o
        ));
    };

    const handleReject = async (orderId: string, reason: string) => {
        if (onOrderReject) {
            await onOrderReject(orderId, reason);
        }
        // Update local state
        setOrders(orders => orders.map(o =>
            o.id === orderId ? { ...o, status: 'rejected' as OrderStatus } : o
        ));
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedAgent(null);
    };

    // Client-side only rendering for Portal
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // Get column titles for confirmation message
    const getColumnTitle = (id: string) => columns.find(c => c.id === id)?.title || id;

    return (
        <div className="flex flex-col gap-4">
            {/* Filters */}
            <OrderFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedAgent={selectedAgent}
                onAgentChange={setSelectedAgent}
                agents={agents}
                onClearFilters={clearFilters}
            />

            {/* Kanban Board */}
            <div className="flex overflow-x-auto gap-4 pb-4">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    onDragEnd={onDragEnd}
                >
                    <div className="flex gap-4 min-w-full">
                        {columns.map((col) => (
                            <KanbanColumn
                                key={col.id}
                                column={col}
                                orders={filteredOrders.filter((order) => order.status === col.id)}
                                onOrderClick={handleOrderClick}
                            />
                        ))}
                    </div>

                    {mounted && createPortal(
                        <DragOverlay>
                            {activeOrder && (
                                <div className="opacity-80 rotate-2">
                                    <OrderCard order={activeOrder} />
                                </div>
                            )}
                        </DragOverlay>,
                        document.body
                    )}
                </DndContext>
            </div>

            {/* Order Detail Modal */}
            <OrderDetailModal
                order={selectedOrder ? kanbanToOrder(selectedOrder) : null}
                open={modalOpen}
                onOpenChange={setModalOpen}
                onApprove={handleApprove}
                onReject={handleReject}
            />

            {/* Drag Confirmation Modal */}
            <Dialog open={confirmModalOpen} onOpenChange={(open) => !open && handleCancelDrag()}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Move Order?</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to move this order from{' '}
                            <span className="font-semibold text-gray-900">{pendingDrag ? getColumnTitle(pendingDrag.originalStatus) : '...'}</span> to{' '}
                            <span className="font-semibold text-gray-900">{pendingDrag ? getColumnTitle(pendingDrag.overId) : '...'}</span>?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={handleCancelDrag}>Cancel</Button>
                        <Button onClick={handleConfirmDrag}>Confirm Move</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
