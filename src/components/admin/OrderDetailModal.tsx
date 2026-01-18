/**
 * @file Order Detail Modal
 * @description Modal for viewing complete order details with tabs and actions
 * 
 * @owner Dev 1
 */

'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Order, OrderStatus } from '@/types/order'
import {
    User,
    Phone,
    Mail,
    Building2,
    MessageCircle,
    CreditCard,
    Package,
    Clock,
    CheckCircle,
    XCircle,
    Copy,
    AlertTriangle
} from 'lucide-react'

interface OrderDetailModalProps {
    order: Order | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onApprove?: (orderId: string) => void
    onReject?: (orderId: string, reason: string) => void
    onUpdateStatus?: (orderId: string, status: OrderStatus) => void
}

export function OrderDetailModal({
    order,
    open,
    onOpenChange,
    onApprove,
    onReject,
    onUpdateStatus
}: OrderDetailModalProps) {
    const [showRejectDialog, setShowRejectDialog] = useState(false)
    const [rejectReason, setRejectReason] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)

    if (!order) return null

    const handleApprove = async () => {
        if (!onApprove) return
        setIsProcessing(true)
        await onApprove(order.id)
        setIsProcessing(false)
        onOpenChange(false)
    }

    const handleReject = async () => {
        if (!onReject || !rejectReason.trim()) return
        setIsProcessing(true)
        await onReject(order.id, rejectReason)
        setIsProcessing(false)
        setShowRejectDialog(false)
        setRejectReason('')
        onOpenChange(false)
    }

    const copyWhatsAppMessage = () => {
        const message = `Hi ${order.customerName}! 🎉

Your TapOnce NFC card order #${order.orderNumber} has been approved!

Card Design: ${order.cardDesign?.name || 'Standard'}
Price: ₹${order.salePrice}

Your profile is now live at:
https://taponce.in/${order.portfolioSlug}

Login Credentials:
Username: ${order.customerEmail}
Password: (sent separately)

Thank you for choosing TapOnce! 🙌`

        navigator.clipboard.writeText(message)
    }

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return '-'
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <DialogTitle className="text-xl">
                                Order #{order.orderNumber}
                            </DialogTitle>
                            <StatusBadge status={order.status} />
                        </div>
                        {order.isBelowMsp && (
                            <Badge variant="destructive" className="flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                Below MSP
                            </Badge>
                        )}
                    </div>
                </DialogHeader>

                <Tabs defaultValue="customer" className="mt-4">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="customer">Customer</TabsTrigger>
                        <TabsTrigger value="order">Order</TabsTrigger>
                        <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    </TabsList>

                    {/* Customer Tab */}
                    <TabsContent value="customer" className="space-y-4 mt-4">
                        <div className="grid gap-4">
                            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                    <User className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="font-semibold">{order.customerName}</p>
                                    {order.customerCompany && (
                                        <p className="text-sm text-muted-foreground">{order.customerCompany}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="w-4 h-4 text-muted-foreground" />
                                    <a href={`tel:${order.customerPhone}`} className="hover:underline">
                                        {order.customerPhone}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail className="w-4 h-4 text-muted-foreground" />
                                    <a href={`mailto:${order.customerEmail}`} className="hover:underline">
                                        {order.customerEmail}
                                    </a>
                                </div>
                                {order.customerWhatsapp && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <MessageCircle className="w-4 h-4 text-muted-foreground" />
                                        <a
                                            href={`https://wa.me/${order.customerWhatsapp.replace(/\D/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline text-green-600"
                                        >
                                            {order.customerWhatsapp}
                                        </a>
                                    </div>
                                )}
                            </div>

                            {order.agent && (
                                <div className="p-3 border rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-1">Sold by Agent</p>
                                    <p className="font-medium">{order.agent.fullName}</p>
                                    <p className="text-sm text-muted-foreground">Code: {order.agent.referralCode}</p>
                                </div>
                            )}

                            {order.isDirectSale && (
                                <Badge variant="secondary">Direct Website Sale</Badge>
                            )}
                        </div>
                    </TabsContent>

                    {/* Order Tab */}
                    <TabsContent value="order" className="space-y-4 mt-4">
                        <div className="grid gap-4">
                            <div className="p-3 border rounded-lg">
                                <p className="text-xs text-muted-foreground mb-1">Card Design</p>
                                <div className="flex items-center gap-3">
                                    <Package className="w-5 h-5 text-primary" />
                                    <span className="font-medium">{order.cardDesign?.name || 'Standard Design'}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 border rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-1">Sale Price</p>
                                    <p className="text-xl font-bold text-green-600">₹{order.salePrice}</p>
                                </div>
                                <div className="p-3 border rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-1">MSP at Order</p>
                                    <p className="text-xl font-bold">₹{order.mspAtOrder}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 border rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-1">Agent Commission</p>
                                    <p className="text-lg font-semibold">₹{order.commissionAmount}</p>
                                </div>
                                <div className="p-3 border rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-1">Payment Status</p>
                                    <Badge variant="outline" className="capitalize">
                                        {order.paymentStatus.replace('_', ' ')}
                                    </Badge>
                                </div>
                            </div>

                            {order.specialInstructions && (
                                <div className="p-3 border rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-1">Special Instructions</p>
                                    <p className="text-sm">{order.specialInstructions}</p>
                                </div>
                            )}

                            {order.adminNotes && (
                                <div className="p-3 border rounded-lg bg-amber-50">
                                    <p className="text-xs text-muted-foreground mb-1">Admin Notes</p>
                                    <p className="text-sm">{order.adminNotes}</p>
                                </div>
                            )}

                            {order.portfolioSlug && (
                                <div className="p-3 border rounded-lg bg-green-50">
                                    <p className="text-xs text-muted-foreground mb-1">Portfolio URL</p>
                                    <a
                                        href={`https://taponce.in/${order.portfolioSlug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline font-medium"
                                    >
                                        taponce.in/{order.portfolioSlug}
                                    </a>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    {/* Timeline Tab */}
                    <TabsContent value="timeline" className="space-y-4 mt-4">
                        <div className="space-y-4">
                            <TimelineItem
                                icon={<Clock className="w-4 h-4" />}
                                label="Order Created"
                                date={formatDate(order.createdAt)}
                                active
                            />
                            {order.approvedAt && (
                                <TimelineItem
                                    icon={<CheckCircle className="w-4 h-4" />}
                                    label="Approved"
                                    date={formatDate(order.approvedAt)}
                                    active
                                />
                            )}
                            {order.shippedAt && (
                                <TimelineItem
                                    icon={<Package className="w-4 h-4" />}
                                    label="Shipped"
                                    date={formatDate(order.shippedAt)}
                                    extra={order.trackingNumber ? `Tracking: ${order.trackingNumber}` : undefined}
                                    active
                                />
                            )}
                            {order.deliveredAt && (
                                <TimelineItem
                                    icon={<CheckCircle className="w-4 h-4" />}
                                    label="Delivered"
                                    date={formatDate(order.deliveredAt)}
                                    active
                                />
                            )}
                            {order.paidAt && (
                                <TimelineItem
                                    icon={<CreditCard className="w-4 h-4" />}
                                    label="Payment Complete"
                                    date={formatDate(order.paidAt)}
                                    active
                                />
                            )}
                            {order.rejectionReason && (
                                <TimelineItem
                                    icon={<XCircle className="w-4 h-4 text-red-500" />}
                                    label="Rejected"
                                    date=""
                                    extra={order.rejectionReason}
                                    variant="destructive"
                                    active
                                />
                            )}
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Footer Actions */}
                <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-6">
                    {order.status === 'pending_approval' && (
                        <>
                            {showRejectDialog ? (
                                <div className="flex-1 space-y-2">
                                    <Textarea
                                        placeholder="Enter rejection reason..."
                                        value={rejectReason}
                                        onChange={(e) => setRejectReason(e.target.value)}
                                        className="min-h-[80px]"
                                    />
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => setShowRejectDialog(false)}
                                            className="flex-1"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={handleReject}
                                            disabled={!rejectReason.trim() || isProcessing}
                                            className="flex-1"
                                        >
                                            {isProcessing ? 'Rejecting...' : 'Confirm Reject'}
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowRejectDialog(true)}
                                        className="flex items-center gap-2"
                                    >
                                        <XCircle className="w-4 h-4" />
                                        Reject
                                    </Button>
                                    <Button
                                        onClick={handleApprove}
                                        disabled={isProcessing}
                                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        {isProcessing ? 'Approving...' : 'Approve Order'}
                                    </Button>
                                </>
                            )}
                        </>
                    )}

                    {order.status === 'approved' && order.portfolioSlug && (
                        <Button
                            variant="outline"
                            onClick={copyWhatsAppMessage}
                            className="flex items-center gap-2"
                        >
                            <Copy className="w-4 h-4" />
                            Copy WhatsApp Message
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

// Timeline Item Component
function TimelineItem({
    icon,
    label,
    date,
    extra,
    active = false,
    variant = 'default'
}: {
    icon: React.ReactNode
    label: string
    date: string
    extra?: string
    active?: boolean
    variant?: 'default' | 'destructive'
}) {
    return (
        <div className={`flex gap-3 ${active ? 'opacity-100' : 'opacity-50'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${variant === 'destructive'
                ? 'bg-red-100'
                : 'bg-primary/10'
                }`}>
                {icon}
            </div>
            <div className="flex-1">
                <p className="font-medium text-sm">{label}</p>
                {date && <p className="text-xs text-muted-foreground">{date}</p>}
                {extra && <p className="text-xs text-muted-foreground mt-1">{extra}</p>}
            </div>
        </div>
    )
}
