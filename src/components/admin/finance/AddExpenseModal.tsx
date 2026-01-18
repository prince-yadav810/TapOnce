/**
 * @file Add Expense Modal
 * @description Form for adding manual expenses
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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { ExpenseCategory } from './ExpenseBreakdown'
import { Receipt } from 'lucide-react'

interface AddExpenseModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (data: {
        category: ExpenseCategory
        amount: number
        description: string
        date: string
    }) => Promise<void>
}

export function AddExpenseModal({
    open,
    onOpenChange,
    onSubmit
}: AddExpenseModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [category, setCategory] = useState<ExpenseCategory | ''>('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])

    const handleSubmit = async () => {
        if (!category || !amount) return

        setIsSubmitting(true)
        await onSubmit({
            category,
            amount: parseFloat(amount),
            description,
            date
        })
        setIsSubmitting(false)

        // Reset form
        setCategory('')
        setAmount('')
        setDescription('')
        setDate(new Date().toISOString().split('T')[0])
        onOpenChange(false)
    }

    const isValid = category && amount && parseFloat(amount) > 0

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Receipt className="w-5 h-5" />
                        Add Expense
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select value={category} onValueChange={(v) => setCategory(v as ExpenseCategory)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="printing">Card Printing</SelectItem>
                                <SelectItem value="shipping">Shipping</SelectItem>
                                <SelectItem value="marketing">Marketing</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount (₹) *</Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="e.g., Bulk card printing from Wekonnect"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={2}
                        />
                    </div>
                </div>

                <DialogFooter className="mt-6">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={!isValid || isSubmitting}>
                        {isSubmitting ? 'Adding...' : 'Add Expense'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
