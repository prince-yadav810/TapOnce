'use client';

/**
 * @file Kanban Column Component
 * @description Droppable column for the Kanban board
 * 
 * @owner Dev 1
 */

import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { useMemo } from 'react';
import { KanbanColumn as IKanbanColumn, KanbanOrder } from '@/types/kanban';
import { OrderCard } from './OrderCard';

interface KanbanColumnProps {
    column: IKanbanColumn;
    orders: KanbanOrder[];
    onOrderClick?: (order: KanbanOrder) => void;
}

export function KanbanColumn({ column, orders, onOrderClick }: KanbanColumnProps) {
    const ordersIds = useMemo(() => orders.map((order) => order.id), [orders]);

    const { setNodeRef } = useDroppable({
        id: column.id,
        data: {
            type: 'Column',
            column,
        },
    });

    return (
        <div
            ref={setNodeRef}
            className="bg-secondary/30 rounded-lg p-2 flex flex-col gap-2 min-w-[300px] w-[300px] h-full max-h-full"
        >
            <div className="flex items-center justify-between p-2 font-semibold">
                <div className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: column.color }}
                    />
                    {column.title}
                </div>
                <span className="text-muted-foreground text-sm bg-secondary px-2 py-0.5 rounded-full">
                    {orders.length}
                </span>
            </div>

            <div className="flex-1 overflow-y-auto min-h-[100px] pr-1 scrollbar-thin scrollbar-thumb-secondary">
                <SortableContext items={ordersIds}>
                    {orders.map((order) => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            onClick={onOrderClick}
                        />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
}
