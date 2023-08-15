import React from 'react'
import Logo from "@/assets/eraskon/IMG-20230608-WA0069-removebg-preview.png"
import Link from 'next/link'
import Image from 'next/image'
import Socials from '../Socials'


const Footer = () => {

  return (
      <footer className=''>
        <div className='py-6 text-white md:py-10 section grad-to-right'>
          {/* <Socials /> */}
          <div className="flex flex-col gap-12 lg:flex-row">
            <div className="flex flex-col items-start justify-center">
              <Image src={Logo} className='w-24 h-24 md:h-24' alt='' />
              <h2 className="text-4xl font-extrabold text-white">ERASKON</h2>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col ">
                <h5 className='font-bold text-gold'>Head Office</h5>
                <p className="text-base font-normal text-white">EL-AL Court, Plot 35, Chief Yesufu Abiodun Oniru Road, VI, Lagos State.</p>
              </div>
              <div className="flex flex-col">
                <h5 className='font-bold text-gold'>Operational Base</h5>
                <p className="text-base font-normal text-white">By Shell Gas Central Processing Facility, Gbaran-Yenogoa, Bayelsa State.</p>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center ">
              <div className="flex items-center justify-center gap-2">
                <h5 className='font-bold text-gold'>Phone: </h5>
                <p className="text-base font-normal text-white">+234(01)3423432, (01)3423433</p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <h5 className='font-bold text-gold'>Hotline: </h5>
                <p className="text-base font-normal text-white">+234(0)13423432-3, +234(0)9062829067</p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <h5 className='font-bold text-gold'>Email: </h5>
                <p className="text-base font-normal text-white">eraskoncustomercare@eraskon.com</p>
              </div>
            </div>
          </div>
          <p className='mt-6 text-center'>
            @2023 Eraskon. All Rights Reserved.
          </p>
        </div>
      </footer>
  )
}

export default Footer