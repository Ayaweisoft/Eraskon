import { useState, FormEvent } from 'react'
import { toast } from 'react-toastify';


interface Props {
    api: (string);
    method?: "POST" | "GET" | "PUT" | "DELETE" | "PATCH"
    onSuccess?: (a?: any) => void
    onFailure?: (a?: any) => void
}

const usePost = ({ api, method, onSuccess, onFailure, ...rest }: Props) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [data, setData] = useState(null)

    const post = async (val: any, route?: string): Promise<void> => {
        setLoading(true)
        setError('')
        // console.log({val})
        try {
            const res = await fetch(`/api/${route || api}`, {
                method: method ? method : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(val)
            })
 
             
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
            toast.error(error?.message || 'An error Occured')
        }
        setLoading(false)
    }



    return { loading, error, data, post }
}

export default usePost