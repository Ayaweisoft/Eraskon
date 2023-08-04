import Link from 'next/link'
import React from 'react'
import Button  from '../Button'
import { signIn, signOut, useSession } from 'next-auth/react'
import { MdLogout } from 'react-icons/md'


const Links = ({ isOpen }: { isOpen: boolean }) => {

  return (
    <div className={`md:hidden shadow fixed top-0 right-0 w-5/6 min-h-screen h-screen bg-white text-black px-4  py-2 md:px-10 z-30 ${isOpen ? "translate-x-0" : "translate-x-full"} transition-all duration-300`}>
          <nav className="md:hidden flex flex-col h-full justify-between gap-16 p-4 pt-20 px-8 mb-8">
            <ul className='flex flex-col text-dark-light gap-7 md:gap-4 lg:gap-7 font-medium'>
              <li><Link href="/admin" className={`pb-1.5 px-1 font-medium`}>Dashboard</Link></li>
              <li><Link href="/admin/products" className={`pb-1.5 px-1 font-medium`}>Products</Link></li>
              <li><Link href="/admin/cms" className={`pb-1.5 px-1 font-medium`}>Home Content</Link></li>
              <li><Link href="/admin/feedbacks" className={`pb-1.5 px-1 font-medium`}>Feedbacks</Link></li>
              <li><Link href="/admin/faqs" className={`pb-1.5 px-1 font-medium`}>FAQs</Link></li>
              {/* {!user ? 
              <li><Link href="/login" className={`${pathname==="/login" && "text-green"} pb-1.5 px-1 font-medium`}>Login</Link></li>
                :
                <li>
                  <div onClick={() => dispatch({type: "LOGOUT"})} className='px-1 font-medium cursor-pointer'>
                    Logout
                  </div>
                </li>
              } */}
            </ul>

          <div onClick={() => signOut()} className={`w-fit py-2 pb-2.5 px-6 flex items-center gap-2 text-xs font-medium grad-to-right text-white rounded-full mb-12`}>
              <MdLogout size={"1.3rem"} />
              Logout
          </div>
          </nav>
        </div>
  )
}

export default Links