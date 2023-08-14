import React from 'react'
import { BiMenu } from 'react-icons/bi'
import Logo from "@/assets/logo.jpg"
import { MdOutlineClose } from 'react-icons/md'
import Image from 'next/image'
import Links from '../Links'


const Head = () => {
  const [isOpen, setIsOpen] = React.useState(false)


  return (
    <div className='absolute top-0 left-0 z-30 flex items-center justify-between w-full gap-4 p-4 bg-white shadow sm:px-12'>
        <h1 className='text-xl text-[#69707D] font-medium'>
            Dashboard
        </h1>
        <div className='flex items-center gap-4'>
          <div className='flex items-center w-8 h-8 gap-1'>
          {/* <Image src={Logo} className='w-12 h-12 md:h-12' alt='' /> */}
            {/* <Image src={''} alt="" className='object-cover w-full h-full bg-gray-100 rounded-full' /> */}
          </div>
          { isOpen ? 
            <MdOutlineClose onClick={() => setIsOpen(false)} className={`cursor-pointer text-3xl md:hidden relative z-50 text-gray-dark`} /> 
            : <BiMenu onClick={() => setIsOpen(true)} className='relative z-50 text-3xl cursor-pointer md:hidden text-gray-dark' />
          }
        </div>
          <Links isOpen={isOpen} />
    </div>
  )
}

export default Head