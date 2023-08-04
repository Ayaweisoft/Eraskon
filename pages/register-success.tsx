import Header from '@/components/Header'
import Link from 'next/link'
import React from 'react'

const RegisterSuccess = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center text-center'>
        <Header />
        <div className='flex flex-col justify-center items-center gap-12 max-w-lg'>     
            <div className="h-40 w-40 bg-gray-200"></div>
            <div className="flex flex-col justify-center items-center gap-1">
                <h1 className="text-4xl font-extrabold text-primary font-argentinum">Registration Successful</h1>
                <p className="text-xl text-gray-500">
                    Thank you for signing up
                </p>
            </div>
            <Link href="/login" className="text-lg font-bold hover:underline grad-to-right px-8 py-4 rounded-xl text-white">
                Login to your Account
            </Link>
        </div>
    </div>
  )
}

export default RegisterSuccess