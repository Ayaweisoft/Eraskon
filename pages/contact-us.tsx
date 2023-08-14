import { FormEvent, useEffect, useReducer, useState } from 'react'
import Button from '@/components/Button'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import ContactImg from '@/assets/contact.png'
import { IContactUs, IReducerAction } from '@/interfaces'
import usePost from '@/hooks/usePost';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader';


const initialState: IContactUs = {
    email: '',
    name: '',
    message: '',
}

type IAction = 'email' | 'name' | 'message' | 'reset'

const ContactUs = () => {
    const [feedback, dispatch] = useReducer((state: IContactUs, action: IReducerAction<IAction>) => {
        if (action.type === 'reset') return initialState
        return { ...state, [action.type]: action.payload }
    }, initialState)

    const { loading, error, data, post } = usePost({ 
        api: "/feedbacks",
        onSuccess: () => {
            toast('Feedback Sent Successfullly')
            dispatch({ type: 'reset'})
        } 
    })

    const sendFeedback = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        post(feedback)
    }
  return (
    <>
        <Header />
        {(loading) && <Loader modalOpen={true} />}
        <div className="flex flex-col items-center justify-center gap-4 section top-section grad-to-right">
            <h1 className="text-xl font-semibold text-center text-white md:text-3xl">
                Contact Us
            </h1> 
        </div>
        <section className="flex flex-col gap-3 pt-20 pb-20 section md:flex-row">
            <div className="flex flex-col justify-between w-full gap-4 md:flex-row md:gap-12">
                <div className="flex flex-col flex-1 gap-4">
                    <Image src={ContactImg} alt="" className="w-full h-40 max-w-sm mb-8" />
                    <div>
                        <h3 className="mb-3 text-xl font-bold text-gray-800 font-argentinum">Office Address</h3>
                        <p className="text-sm text-[#6D6D6D] font-medium">EL-AL Court, Plot 35, <br />Chief Yesufu Abiodun Oniru Road, <br />VI, Lagos State, Nigeria </p>
                    </div>
                    <div>
                        <h3 className="mb-3 text-xl font-bold text-gray-800 font-argentinum">Phone Number</h3>
                        <div className="text-sm text-[#6D6D6D] font-medium flex flex-col">
                            <a href='tel:+234013423432'>+234(01)3423432</a>
                            <a href='tel:+013423433'>+(01)3423433</a>
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-3 text-xl font-bold text-gray-800 font-argentinum">Email Address</h3>
                        <div className="text-sm text-[#6D6D6D] font-medium flex flex-col">
                            {/* <a href="https://box.reinsys.net/brilliant/" className="hover:text-primary">
                                https://box.reinsys.net/brilliant/
                            </a> */}
                            <a href="mailto:eraskoncustomercare@eraskon.com" className="hover:text-primary">
                                eraskoncustomercare@eraskon.com
                            </a>
                        </div>
                        {/* <div className="text-sm text-[#6D6D6D] font-medium flex flex-col">
                            <a href="www.bbscholarships.org" className="hover:text-primary">
                                www.bbscholarships.org
                            </a>
                            <a href="mailto:info@bbscholarships.org" className="hover:text-primary">
                                info@bbscholarships.org
                            </a>
                        </div> */}
                    </div>
                </div>
                <div className="flex flex-col flex-1 p-4 bg-white shadow-lg md:p-10 rounded-xl text-black/50">
                    <h1 className="mb-3 text-lg font-bold font-argentinum">SEND US A MESSAGE</h1>
                    <form className="flex flex-col gap-4 mt-4" onSubmit={sendFeedback}>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="name" className="text-xs font-bold">Full Name</label>
                            <input required onChange={(e) => dispatch({ type: 'name', payload: e.target.value })} value={feedback?.name} type="text" placeholder="name" className="px-4 py-3 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:opacity-35 placeholder:text-xs" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="email" className="text-xs font-bold">Email</label>
                            <input required onChange={(e) => dispatch({ type: 'email', payload: e.target.value })} value={feedback?.email} type="email" placeholder="Email" className="px-4 py-3 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:opacity-35 placeholder:text-xs" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="message" className="text-xs font-bold">Message</label>
                            <textarea required onChange={(e) => dispatch({ type: 'message', payload: e.target.value })} value={feedback?.message} rows={5} cols={10} id='message' placeholder="message" className="px-4 py-3 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:opacity-35 placeholder:text-xs" />
                        </div>
                        <Button className="px-4 py-2 text-white bg-primary rounded-xl hover:bg-primary-hover focus:bg-primary-hover focus:outline-none">Submit</Button>
                    </form>
                </div>
            </div>
        </section>
        <Footer />
    </>
  )
}

export default ContactUs