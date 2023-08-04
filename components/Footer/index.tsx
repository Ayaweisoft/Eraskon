import React from 'react'
import Logo from "@/assets/eraskon/IMG-20230608-WA0069-removebg-preview.png"
import Link from 'next/link'
import Image from 'next/image'
import Socials from '../Socials'


const Footer = () => {

  return (
      <footer className=''>
        <div className='py-6 md:py-10 section grad-to-right text-white'>
          {/* <Socials /> */}
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex flex-col justify-center items-start">
              <Image src={Logo} className='w-24 h-24 md:h-24' alt='' />
              <h2 className="text-white font-extrabold text-4xl">ERASKON</h2>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col ">
                <h5 className='text-gold font-bold'>Head Office</h5>
                <p className="text-white text-base font-normal">EL-AL Court, Plot 35, Chief Yesufu Abiodun Oniru Road, VI, Lagos State.</p>
              </div>
              <div className="flex flex-col">
                <h5 className='text-gold font-bold'>Operational Base</h5>
                <p className="text-white text-base font-normal">By Shell Gas Central Processing Facility, Gbaran-Yenogoa, Bayelsa State.</p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start  ">
              <div className="flex justify-center gap-2 items-center">
                <h5 className='text-gold font-bold'>Phone: </h5>
                <p className="text-white text-base font-normal">+234(01)3423432, (01)3423433</p>
              </div>
              <div className="flex justify-center gap-2 items-center">
                <h5 className='text-gold font-bold'>Hotline: </h5>
                <p className="text-white text-base font-normal">+234(0)13423432-3, +234(0)9062829067</p>
              </div>
              <div className="flex justify-center gap-2 items-center">
                <h5 className='text-gold font-bold'>Email: </h5>
                <p className="text-white text-base font-normal">eraskoncustomercare@eraskon.com</p>
              </div>
            </div>
          </div>
          <p className='text-center mt-6'>
            @2023 Eraskon. All Rights Reserved.
          </p>
        </div>
      </footer>
  )
}

export default Footer