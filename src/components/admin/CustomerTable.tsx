/**
 * @file Customer Table Component
 * @description Table displaying customer list with actions
 * 
 * @owner Dev 1
 */

'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Customer, CustomerStatus } from '@/types/customer'
import {
    MoreHorizontal,
    Eye,
    Pencil,
    UserX,
    UserCheck,
    ExternalLink,
    Copy
} from 'lucide-react'

interface CustomerTableProps {
    customers: Customer[]
    onViewCustomer: (customer: Customer) => void
    onEditCustomer: (customer: Customer) => void
    onToggleStatus: (customer: Customer) => void
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

export function CustomerTable({
    customers,
    onViewCustomer,
    onEditCustomer,
    onToggleStatus
}: CustomerTableProps) {
    const copyProfileUrl = (slug: string) => {
        navigator.clipboard.writeText(`https://taponce.in/${slug}`)
    }

    if (customers.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <UserX className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No customers found</h3>
                <p className="text-muted-foreground mt-1">
                    Try adjusting your search or filters
                </p>
            </div>
        )
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[300px]">Customer</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Portfolio</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="w-[70px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {customers.map((customer) => (
                        <TableRow
                            key={customer.id}
                            className="cursor-pointer"
                            onClick={() => onViewCustomer(customer)}
                        >
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={customer.avatarUrl} alt={customer.fullName} />
                                        <AvatarFallback className="bg-primary/10 text-primary">
                                            {getInitials(customer.fullName)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{customer.fullName}</p>
                                        {customer.jobTitle && (
                                            <p className="text-sm text-muted-foreground">{customer.jobTitle}</p>
                                        )}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="text-sm">{customer.company || '-'}</span>
                            </TableCell>
                            <TableCell>
                                <div className="text-sm">
                                    <p>{customer.email}</p>
                                    <p className="text-muted-foreground">{customer.phone}</p>
                                </div>
                            </TableCell>
                            <TableCell>
                                <a
                                    href={`https://taponce.in/${customer.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-sm text-primary hover:underline flex items-center gap-1"
                                >
                                    /{customer.slug}
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant="outline"
                                    className={`${statusColors[customer.status]} capitalize`}
                                >
                                    {customer.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <span className="text-sm text-muted-foreground">
                                    {new Date(customer.createdAt).toLocaleDateString('en-IN', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </span>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={(e) => {
                                            e.stopPropagation()
                                            onViewCustomer(customer)
                                        }}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={(e) => {
                                            e.stopPropagation()
                                            onEditCustomer(customer)
                                        }}>
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Edit Profile
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={(e) => {
                                            e.stopPropagation()
                                            copyProfileUrl(customer.slug)
                                        }}>
                                            <Copy className="mr-2 h-4 w-4" />
                                            Copy Profile URL
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                onToggleStatus(customer)
                                            }}
                                            className={customer.status === 'active' ? 'text-red-600' : 'text-green-600'}
                                        >
                                            {customer.status === 'active' ? (
                                                <>
                                                    <UserX className="mr-2 h-4 w-4" />
                                                    Suspend Customer
                                                </>
                                            ) : (
                                                <>
                                                    <UserCheck className="mr-2 h-4 w-4" />
                                                    Activate Customer
                                                </>
                                            )}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
