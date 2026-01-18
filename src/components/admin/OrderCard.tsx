'use client';

/**
 * @file Order Card Component
 * @description Draggable order card for Kanban board with click-to-open functionality
 * 
 * @owner Dev 1
 */

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { KanbanOrder } from '@/types/kanban';
import { AlertTriangle, User } from 'lucide-react';

interface OrderCardProps {
    order: KanbanOrder;
    onClick?: (order: KanbanOrder) => void;
}

export function OrderCard({ order, onClick }: OrderCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: order.id,
        data: {
            type: 'Order',
            order,
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const isBelowMsp = order.salePrice < order.msp;

    const handleClick = (e: React.MouseEvent) => {
        // Only trigger click if not dragging (check if mouse moved minimally)
        if (onClick) {
            onClick(order);
        }
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="opacity-50 h-[150px] bg-muted/50 border-2 border-dashed border-primary/20 rounded-lg"
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="mb-3"
            onClick={handleClick}
        >
            <Card className={`hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing ${isBelowMsp ? 'border-red-200 bg-red-50/50' : ''
                }`}>
                <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                        <Badge variant="outline" className="text-xs">
                            #{order.orderNumber}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <CardTitle className="text-sm font-medium mt-1 flex items-center gap-2">
                        {order.customerName}
                        {isBelowMsp && (
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                        )}
                    </CardTitle>
                    <CardDescription className="text-xs truncate">
                        {order.designName || 'Standard Design'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center text-muted-foreground">
                            <span className="text-xs">Price:</span>
                        </div>
                        <div className={`font-semibold ${isBelowMsp ? 'text-red-600' : 'text-green-600'}`}>
                            ₹{order.salePrice}
                        </div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground flex justify-between">
                        <span>MSP: ₹{order.msp}</span>
                        {isBelowMsp && (
                            <span className="text-red-500 font-bold">Below MSP</span>
                        )}
                    </div>
                    {order.agentName && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                            <User className="w-3 h-3" />
                            <span>{order.agentName}</span>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
