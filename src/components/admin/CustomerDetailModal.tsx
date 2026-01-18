/**
 * @file Customer Detail Modal
 * @description Modal for viewing and editing customer details
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
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Customer, CustomerStatus } from '@/types/customer'
import {
    User,
    Phone,
    Mail,
    Building2,
    MessageCircle,
    Globe,
    Linkedin,
    Instagram,
    Facebook,
    Twitter,
    ExternalLink,
    Copy,
    QrCode,
    Pencil,
    UserX,
    UserCheck,
    Package
} from 'lucide-react'

interface CustomerDetailModalProps {
    customer: Customer | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onEdit?: (customer: Customer) => void
    onToggleStatus?: (customer: Customer) => void
}

const statusColors: Record<CustomerStatus, string> = {
    active: 'bg-green-100 text-green-800 border-green-200',
    pending: 'bg-amber-100 text-amber-800 border-amber-200',
    suspended: 'bg-red-100 text-red-800 border-red-200'
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

export function CustomerDetailModal({
    customer,
    open,
    onOpenChange,
    onEdit,
    onToggleStatus
}: CustomerDetailModalProps) {
    if (!customer) return null

    const copyProfileUrl = () => {
        navigator.clipboard.writeText(`https://taponce.in/${customer.slug}`)
    }

    const socialLinks = [
        { icon: Linkedin, url: customer.linkedinUrl, label: 'LinkedIn' },
        { icon: Instagram, url: customer.instagramUrl, label: 'Instagram' },
        { icon: Facebook, url: customer.facebookUrl, label: 'Facebook' },
        { icon: Twitter, url: customer.twitterUrl, label: 'Twitter' },
        { icon: Globe, url: customer.websiteUrl, label: 'Website' },
    ].filter(link => link.url)

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={customer.avatarUrl} alt={customer.fullName} />
                                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                                    {getInitials(customer.fullName)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <DialogTitle className="text-xl">{customer.fullName}</DialogTitle>
                                {customer.jobTitle && (
                                    <p className="text-muted-foreground">{customer.jobTitle}</p>
                                )}
                            </div>
                        </div>
                        <Badge
                            variant="outline"
                            className={`${statusColors[customer.status]} capitalize`}
                        >
                            {customer.status}
                        </Badge>
                    </div>
                </DialogHeader>

                <Tabs defaultValue="profile" className="mt-4">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                        <TabsTrigger value="orders">Orders</TabsTrigger>
                    </TabsList>

                    {/* Profile Tab */}
                    <TabsContent value="profile" className="space-y-4 mt-4">
                        {/* Company */}
                        {customer.company && (
                            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                <Building2 className="w-5 h-5 text-muted-foreground" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Company</p>
                                    <p className="font-medium">{customer.company}</p>
                                </div>
                            </div>
                        )}

                        {/* Bio */}
                        {customer.bio && (
                            <div className="p-3 border rounded-lg">
                                <p className="text-xs text-muted-foreground mb-1">Bio</p>
                                <p className="text-sm">{customer.bio}</p>
                            </div>
                        )}

                        {/* Contact */}
                        <div className="grid gap-3">
                            <p className="text-sm font-medium">Contact Information</p>
                            <div className="flex items-center gap-2 text-sm">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                <a href={`mailto:${customer.email}`} className="hover:underline">
                                    {customer.email}
                                </a>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                                <a href={`tel:${customer.phone}`} className="hover:underline">
                                    {customer.phone}
                                </a>
                            </div>
                            {customer.whatsapp && (
                                <div className="flex items-center gap-2 text-sm">
                                    <MessageCircle className="w-4 h-4 text-muted-foreground" />
                                    <a
                                        href={`https://wa.me/${customer.whatsapp.replace(/\D/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline text-green-600"
                                    >
                                        {customer.whatsapp}
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Social Links */}
                        {socialLinks.length > 0 && (
                            <div className="grid gap-3">
                                <p className="text-sm font-medium">Social Links</p>
                                <div className="flex flex-wrap gap-2">
                                    {socialLinks.map((link, idx) => (
                                        <a
                                            key={idx}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-muted/50 transition-colors text-sm"
                                        >
                                            <link.icon className="w-4 h-4" />
                                            {link.label}
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Custom Links */}
                        {customer.customLinks && customer.customLinks.length > 0 && (
                            <div className="grid gap-3">
                                <p className="text-sm font-medium">Custom Links</p>
                                <div className="grid gap-2">
                                    {customer.customLinks.map((link, idx) => (
                                        <a
                                            key={idx}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between px-3 py-2 border rounded-lg hover:bg-muted/50 transition-colors text-sm"
                                        >
                                            <span>{link.label}</span>
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </TabsContent>

                    {/* Portfolio Tab */}
                    <TabsContent value="portfolio" className="space-y-4 mt-4">
                        <div className="p-4 border rounded-lg bg-gradient-to-br from-primary/5 to-primary/10">
                            <p className="text-xs text-muted-foreground mb-2">Portfolio URL</p>
                            <div className="flex items-center gap-2">
                                <code className="flex-1 px-3 py-2 bg-background rounded-lg text-sm font-medium">
                                    taponce.in/{customer.slug}
                                </code>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={copyProfileUrl}
                                    className="shrink-0"
                                >
                                    <Copy className="w-4 h-4 mr-1" />
                                    Copy
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    asChild
                                    className="shrink-0"
                                >
                                    <a
                                        href={`https://taponce.in/${customer.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <ExternalLink className="w-4 h-4 mr-1" />
                                        Visit
                                    </a>
                                </Button>
                            </div>
                        </div>

                        <div className="p-4 border rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                                <QrCode className="w-5 h-5 text-muted-foreground" />
                                <p className="font-medium">QR Code</p>
                            </div>
                            <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">QR Preview</span>
                            </div>
                        </div>

                        <div className="p-3 border rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Created</p>
                            <p className="text-sm">
                                {new Date(customer.createdAt).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>
                    </TabsContent>

                    {/* Orders Tab */}
                    <TabsContent value="orders" className="space-y-4 mt-4">
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3">
                                <Package className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <p className="text-muted-foreground">
                                Order history will show here
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Connect to Supabase to load real data
                            </p>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Actions */}
                <div className="flex gap-2 mt-6 pt-4 border-t">
                    <Button
                        variant="outline"
                        onClick={() => onEdit?.(customer)}
                        className="flex-1"
                    >
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit Profile
                    </Button>
                    <Button
                        variant={customer.status === 'active' ? 'destructive' : 'default'}
                        onClick={() => onToggleStatus?.(customer)}
                        className="flex-1"
                    >
                        {customer.status === 'active' ? (
                            <>
                                <UserX className="w-4 h-4 mr-2" />
                                Suspend
                            </>
                        ) : (
                            <>
                                <UserCheck className="w-4 h-4 mr-2" />
                                Activate
                            </>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
