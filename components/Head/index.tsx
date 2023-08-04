import React from 'react'
import { BiMenu } from 'react-icons/bi'
import Logo from "@/assets/logo.jpg"
import { MdOutlineClose } from 'react-icons/md'
import Image from 'next/image'
import Links from '../Links'


const Head = () => {
  const [isOpen, setIsOpen] = React.useState(false)


  return (
    <div className='absolute z-30 top-0 left-0 w-full p-4 sm:px-12 bg-white shadow flex gap-4 justify-between items-center'>
        <h1 className='text-xl text-[#69707D] font-medium'>
            Dashboard
        </h1>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-1 h-8 w-8'>
          {/* <Image src={Logo} className='w-12 h-12 md:h-12' alt='' /> */}
            {/* <Image src={''} alt="" className='w-full h-full rounded-full object-cover bg-gray-100' /> */}
          </div>
          { isOpen ? 
            <MdOutlineClose onClick={() => setIsOpen(false)} className={`cursor-pointer text-3xl md:hidden relative z-50 text-gray-dark`} /> 
            : <BiMenu onClick={() => setIsOpen(true)} className='cursor-pointer text-3xl md:hidden relative z-50 text-gray-dark' />
          }
        </div>
          <Links isOpen={isOpen} />
    </div>
  )
}

export default Head