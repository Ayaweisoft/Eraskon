import Link from 'next/link'
import React from 'react'

const RegisterSuccess = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center gap-12'>
        <div className="h-40 w-40 bg-gray"></div>
        <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold text-primary font-argentinum mb-3">Registration Successful</h1>
            <p className="text-sm text-gray-500">You have successfully registered for the Brilliant Brain Scholarship Scheme. You will be notified when your application has been approved.</p>
        </div>
        <Link href="/login" className="text-xs hover:underline">
            Login to your Account
        </Link>
    </div>
  )
}

export default RegisterSuccess