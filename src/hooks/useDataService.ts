/**
 * @file useDataService Hook
 * @description React hook for data fetching with loading and error states
 * 
 * @owner Dev 1
 */

'use client'

import { useState, useEffect, useCallback } from 'react'

interface UseDataServiceOptions<T> {
    /** Initial data to use before fetch completes */
    initialData?: T
    /** Whether to fetch immediately on mount */
    fetchOnMount?: boolean
}

interface UseDataServiceResult<T> {
    data: T | undefined
    isLoading: boolean
    error: Error | null
    refetch: () => Promise<void>
}

/**
 * Generic hook for data fetching from services
 * 
 * @example
 * const { data: orders, isLoading, refetch } = useDataService(
 *   () => getOrders({ status: 'pending_approval' }),
 *   { initialData: [] }
 * )
 */
export function useDataService<T>(
    fetcher: () => Promise<T>,
    options: UseDataServiceOptions<T> = {}
): UseDataServiceResult<T> {
    const { initialData, fetchOnMount = true } = options
    const [data, setData] = useState<T | undefined>(initialData)
    const [isLoading, setIsLoading] = useState(fetchOnMount)
    const [error, setError] = useState<Error | null>(null)

    const refetch = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const result = await fetcher()
            setData(result)
        } catch (e) {
            setError(e instanceof Error ? e : new Error('Unknown error'))
        } finally {
            setIsLoading(false)
        }
    }, [fetcher])

    useEffect(() => {
        if (fetchOnMount) {
            refetch()
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return { data, isLoading, error, refetch }
}

/**
 * Hook for data fetching with automatic refetch on dependency change
 */
export function useDataServiceWithDeps<T, D extends readonly unknown[]>(
    fetcher: (...args: D) => Promise<T>,
    deps: D,
    options: UseDataServiceOptions<T> = {}
): UseDataServiceResult<T> {
    const { initialData } = options
    const [data, setData] = useState<T | undefined>(initialData)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const refetch = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const result = await fetcher(...deps)
            setData(result)
        } catch (e) {
            setError(e instanceof Error ? e : new Error('Unknown error'))
        } finally {
            setIsLoading(false)
        }
    }, deps) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        refetch()
    }, [refetch])

    return { data, isLoading, error, refetch }
}
