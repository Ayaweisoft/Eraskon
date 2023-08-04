import { useState, useReducer, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import Button from '@/components/Button'
import Header from '@/components/Header'
import Link from 'next/link'
import React from 'react'
import LockImg from '@/assets/lock.png'
import Image from 'next/image'
import { ILoginReducerAction, IUserLogin } from '@/interfaces'
import { useSession, signIn, signOut } from "next-auth/react"
import Loader from '@/components/Loader';
import { toast } from 'react-toastify'




const initialState: IUserLogin = {
    email: '',
    password: ''
}

const Login = () => {
    const [error, setError] = useState('')
    const { data: session } = useSession()
    const router = useRouter()
    const [user, dispatch] = useReducer((state: IUserLogin, action: ILoginReducerAction) => {
        return { ...state, [action.type]: action.payload }
    }, initialState)

    useEffect(() => {
        if (session) {
            router.push('/admin')
        }
    }, [session, router])

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const error = params.get('error')
        if (error) {
            toast.error(error)
        }
    }, [])

    
    const [loading, setLoading] = useState(false)
    // const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')
        try {
            const res = await signIn('credentials', {
                ...user,
                redirect: true,
                callbackUrl: `${window.location.origin}/admin`
            })

            console.log("login: ", res)

        } catch (error: any) {
            console.log("error", error)
            // setError(error?.message)
            toast.error(error?.message)

        }
        setLoading(false)
    }



  return (

    <div>
        {loading && <Loader modalOpen={true} />}
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen pb-12">
            <section className="w-full pt-20 section md:pt-28">
                <div className="flex flex-col w-full gap-4 md:flex-row md:gap-12">
                    {/* <div className="flex flex-col justify-between flex-1 gap-4">
                        <p className="mb-4 md:text-lg">The Brilliant Brain Scholarship Scheme is a scholarship management platform with a vision to ensuring that no person of school age is denied access to education </p>
                        <Image src={LockImg} alt="" className="" />
                    </div> */}
                    <div className="flex flex-col-reverse items-center justify-center flex-1 text-center md:items-start md:flex-col md:justify-between md:text-left">
                        <div>
                            <p className="md:text-4xl">
                                <span className="font-bold text-gold">Welcome to </span>
                                <span className="font-bold text-blue-800 font-argentinum">Eraskon</span>
                            </p>
                            <p className='hidden md:block'>Eraskon Nigeria Limited (ENL) is an indigenous Security and Logistics services provider in the Oil & Gas and Marine sectors of the Nigerian economy with the vision of delivering top rated security services as required by clients while optimizing client’s profit and minimizing operational cost. </p>
                        </div>
                        {/* <h1 className="mb-3 text-4xl font-bold text-center text-gray-800 font-argentinum md:hidden">Sign In</h1> */}
                        <Image src={LockImg} alt="" className="w-32 h-24 md:w-full md:h-auto" /> 
                    </div>
                    <div className="flex-1 flex flex-col p-4 md:p-10 bg-[#F2F2F2] rounded-xl shadow-md">
                        <h1 className="mb-3 text-3xl font-bold text-gray-800 font-argentinum">Login</h1>
                        <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-4">
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="email" className="text-xs font-semibold text-gray-500">Username or Email</label>
                                <input value={user?.email} onChange={(e) => dispatch({ type: "email", payload: e.target.value})} name='email' id='email' type="email" placeholder="Email" className="px-4 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:opacity-35 placeholder:text-xs" />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="password" className="text-xs font-semibold text-gray-500">Password</label>
                                <input value={user?.password} onChange={(e) => dispatch({ type: "password", payload: e.target.value})} name='password' id='password' type="password" placeholder="Password" className="px-4 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:opacity-35 placeholder:text-xs" />
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className='w-4 h-4 bg-white border border-1'></span>
                                <span className='text-xs text-black/70'>Remember me</span>
                            </div>
                            <Button type='submit' gradient='grad-to-top' className="px-4 py-3 text-sm font-bold text-white rounded-xl hover:bg-primary-hover focus:bg-primary-hover focus:outline-none">Login</Button>
                            <Link href="/register" className="text-xs hover:underline">
                                Dont have an account? Register
                            </Link>
                        </form>
                    </div>
                </div>
            </section>
           
        </div>
    </div>
  )
}

// export const getServerSideProps = async () => {
//     let data;
//     try {
//         const res = await fetch(`/api/login`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 email: "nicholasjd12@gma",
//                 password: "123456"
//             })
//         })
    
//         data = await res.json()
//         // console.log("data login", data)

//     }
//     catch (error: any) {
//         console.log("error", error)
//         return {
//             props: {
//                 title: "Login",
//                 error: error?.message
//             }
//         }
//     }
    
//     return {
//         props: {
//             title: "Login",
//             data
//         }
//     }
    
// }

export default Login