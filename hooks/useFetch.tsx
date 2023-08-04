import { useState, FormEvent, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify';


interface Props {
    api: (string);
    onSuccess?: (a?: any) => void
    onFailure?: (a?: any) => void
}

const useFetch = ({ api, onSuccess, onFailure, ...rest }: Props) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [data, setData] = useState(null)
    const [enabled, setEnabled] = useState(true)

    const fetchData = useCallback(async (): Promise<void> => {
        setLoading(true)
        setError('')
        try {
            const res = await fetch(`${api}`)
             
            if (!res.ok) {
                const error = await res.json()
                throw new Error(error?.message || 'Something Went Wrong!')
            }

            const data = await res.json()

            setData(data)

            if (onSuccess) {
                onSuccess(data)
            }

        } catch (error: any) {
            console.log("error", error)
            setError(error?.message)
            
            if (onFailure) {
                onFailure(error)
            }
        }
        setLoading(false)
    }, [api, onFailure, onSuccess])

    useEffect(() => {
        if (enabled) {
            fetchData()
        }
    }, [enabled, fetchData])



    return { loading, error, data, fetchData, setEnabled, enabled }
}

export default useFetch