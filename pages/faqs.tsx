import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import dbConnect from '@/lib/dbConnection';
import Faqs from '@/models/FaqsModel';
import { IFaqs } from '@/interfaces';


const FAQs = (props: any) => {

  return (
    <>
        <Header />
        <section className='section mt-16 md:mt-20 md:pt-20 py-8 grad-to-right flex flex-col gap-3 text-white'>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white font-argentinum mb-3">FAQs</h1>
            <span className='font-bold'>Home / FAQs</span>
        </section>
        <section className='section py-6 md:py-12'>
            <div className="flex flex-col justify-center items-center text-center mb-4">
                <h1 className="text-3xl md:text-4xl font-extrabold font-argentinum mb-1 md:mb-3">
                    Frequently Asked Questions
                </h1>
                {/* <p className="text-lg md:text-2xl text-primary font-bold text-center">
                    How Can we Help
                </p> */}
            </div>
            <div className={`${(props?.status === 'failed' || props?.faqs?.length === 0 ) ? '' : 'grid sm:grid-cols-2 gap-8'}`}>
                {props?.status === 'failed' || props?.faqs?.length === 0 ? (
                    <h1 className="text-center text-sm">No FAQs Found</h1>
                    ) : 
                    (
                        props?.faqs?.map((item: IFaqs, index: number) => ( 

                            <div key={index} className="flex flex-col gap-3 py-8 px-5 shadow-xl rounded-xl">
                                <h1 className="text-lg font-bold text-primary font-argentinum mb-3">{item?.question}</h1>
                                <p className="text-sm text-gray-500">{item?.answer}</p>
                            </div>
                        ))
                )}
              
            </div>
        </section>
        <Footer />
    </>
  )
}

export default FAQs

export const getServerSideProps = async () => {
    let faqs = []
    try {
        await dbConnect()
        const res = await Faqs.find().lean();
        faqs = JSON.parse(JSON.stringify(res))
    } catch (error) {
        console.log(error)
        return {
            props: {
                title: 'FAQs',
                faqs: [],
                status: 'failed'
            }
        }
    }

    return {
        props: {
            title: 'FAQs',
            faqs,
            status: 'success'
        }
    }
}