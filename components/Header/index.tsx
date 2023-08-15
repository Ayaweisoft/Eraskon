import React, { useState } from 'react'
import { BiMenu } from 'react-icons/bi'
import { MdOutlineClose } from 'react-icons/md'
import Logo from "@/assets/eraskon/IMG-20230608-WA0069-removebg-preview.png"
import Link from 'next/link'
import Image from 'next/image'
import Button from '../Button'
import { useSession, signIn, signOut } from "next-auth/react"

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className='section flex items-center justify-between bg-blue text-black py-2 md:py-5 fixed top-0 left-0 z-30 w-full min-h-[50px]'>
    <header className='flex items-center justify-between w-full '>
        <Link href={"/"} className="flex items-end justify-center gap-4">
          <Image src={Logo} className='w-12 h-12 md:h-12' alt='' />
          <h2 className="text-2xl font-extrabold text-white">ERASKON</h2>
        </Link>
        <nav className="items-center hidden gap-2 text-white lg:flex lg:gap-4 whitespace-nowrap">
          <ul className='flex flex-col items-center gap-2 text-sm font-medium lg:flex-row text-dark-light lg:gap-4'>
            <li><Link href="/" className={`pb-1.5 px-1 font-medium`}>Home</Link></li>
            <li><a href="#about" className={`pb-1.5 px-1 font-medium`}>About Us</a></li>
            <li><Link href="/products" className={`pb-1.5 px-1 font-medium`}>Our Products</Link></li>
            <li className='relative group'>
              <span className={`pb-1.5 px-1 font-medium`}>Our Companies</span>
              <div className='absolute flex-col hidden gap-2 text-white -translate-x-1/2 shadow-md top-8 left-1/2 hover:underline group-hover:flex bg-blue-light'>
                <a target='_blank' href={`https://www.eraskorp.com/`} className='py-1'>
                  <span className={`px-6 text-xs font-medium`}>
                    Eraskorp 
                  </span>
                </a> 
                <a target='_blank' href={`https://eraskoenergy.com/`} className=''>
                  <span className={`px-6 text-xs font-medium`}>
                    Erasko Energy
                  </span>
                </a> 
                <a target='_blank' href={`https://eraskoenergy.com/`} className='pb-2'>
                  <span className={`px-6 text-xs font-medium`}>
                    FPS ltd
                  </span>
                </a> 
              </div>
            </li>
            {/* <li><Link href="/products" className={`pb-1.5 px-1 font-medium`}>Our Companies</Link></li> */}
            {/* <li className='relative cursor-pointer bg-blue group'>
              <span className={`pb-1.5 px-1 font-medium`}>Login</span>
              <div className='absolute left-0 flex-col hidden gap-2 shadow-md top-6 hover:underline group-hover:flex bg-blue-light'>
                <Link href={`/login`} className='py-2'>
                  <span className={`py-2 pb-2.5 px-6 text-xs font-medium`}>
                    Admin
                  </span>
                </Link> 
              </div>
            </li> */}
          </ul>
          <a href={`/contact-us`}>
              <Button className={`py-2 pb-2.5 px-6 text-xs text-blue font-semibold bg-gold rounded-full`}>
                Contact Us
              </Button>
          </a>
        </nav>
      </header>
      <div className={`lg:hidden shadow fixed top-0 right-0 w-5/6 min-h-screen h-screen bg-white text-black px-4  py-2 md:px-10 z-30 ${isOpen ? "translate-x-0" : "translate-x-full"} transition-all duration-300`}>
        <nav className="flex flex-col gap-16 p-4 px-4 pt-20 pl-8 mb-8 lg:hidden">
          <ul className='flex flex-col text-sm font-medium text-dark-light gap-7 md:gap-4 lg:gap-7'>
            <li><Link href="/" className={`pb-1.5 px-1 font-medium`}>Home</Link></li>
            <li><a href="#about" className={`pb-1.5 px-1 font-medium`}>About Us</a></li>
            <li><Link href="/products" className={`pb-1.5 px-1 font-medium`}>Our Products</Link></li>
            {/* <li><Link href="/contact-us" className={`pb-1.5 px-1 font-medium`}>Contact Us</Link></li>
            <li><Link href="/contact-us" className={`pb-1.5 px-1 font-medium`}>Contact Us</Link></li> */}
            <li className='relative group'>
              <span className={`pb-1.5 px-1 font-medium`}>Our Companies</span>
              <div className='absolute flex-col hidden gap-2 text-white -translate-x-1/2 shadow-md top-8 left-1/2 hover:underline group-hover:flex bg-blue-light'>
                <a target='_blank' href={`https://www.eraskorp.com/`} className='py-1'>
                  <span className={`px-6 text-xs font-medium`}>
                    Eraskorp 
                  </span>
                </a> 
                <a target='_blank' href={`https://eraskoenergy.com/`} className=''>
                  <span className={`px-6 text-xs font-medium`}>
                    Erasko Energy
                  </span>
                </a> 
                <a target='_blank' href={`https://eraskoenergy.com/`} className='pb-2'>
                  <span className={`px-6 text-xs font-medium`}>
                    FPS ltd
                  </span>
                </a> 
              </div>
            </li>
            {/* <li className='relative bg-white cursor-pointer group'>
              <span className={`pb-1.5 px-1 font-medium`}>Login</span>
              <div className='absolute left-0 flex-col hidden gap-2 bg-white shadow-md top-6 group-hover:flex text-blue'>
                <Link href={`/login`} className='pb-2'>
                  <span className={`py-2 pb-2.5 px-6 text-xs font-medium`}>
                    Admin
                  </span> 
                </Link>
              </div>
            </li> */}
          </ul>
          <a href={`/contact-us`}>
            <Button className={`py-2 pb-2.5 px-6 text-xs font-semibold text-black bg-gold rounded-full`}>
              Contact Us
            </Button>
          </a>

          {/* <div className='relative group'>
            <Button className={`py-2 pb-2.5 px-6 text-xs text-blue font-semibold bg-gold rounded-full`}>
              Our Companies
            </Button>
            <div className='absolute flex-col hidden gap-2 text-white -translate-x-1/2 shadow-md top-8 left-1/2 hover:underline group-hover:flex bg-blue-light'>
              <a target='_blank' href={`https://www.eraskorp.com/`} className='py-1'>
                <span className={`px-6 text-xs font-medium`}>
                  Eraskorp 
                </span>
              </a> 
              <a target='_blank' href={`https://eraskoenergy.com/`} className=''>
                <span className={`px-6 text-xs font-medium`}>
                  Erasko Energy
                </span>
              </a> 
              <a target='_blank' href={`https://eraskoenergy.com/`} className='pb-2'>
                <span className={`px-6 text-xs font-medium`}>
                  FPS ltd
                </span>
              </a> 
            </div>
          </div> */}
        </nav>
      </div>
      { isOpen ? 
        <MdOutlineClose onClick={() => setIsOpen(false)} className={`cursor-pointer text-3xl lg:hidden relative z-50  text-green`} /> 
        : <BiMenu onClick={() => setIsOpen(true)} className='relative z-50 text-3xl text-white cursor-pointer lg:hidden text-green' />
      }
    </div>
  )
}

export default Header