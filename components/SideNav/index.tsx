import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdOutlineDashboardCustomize, MdLogout, MdOutlineFeedback } from 'react-icons/md'
import { RiTeamLine, RiQuestionnaireLine } from 'react-icons/ri'
import { GiCrownedSkull } from 'react-icons/gi'
import { TbSitemap } from 'react-icons/tb'
import { TiNews } from 'react-icons/ti'
import { FaAward } from 'react-icons/fa'
import { AiTwotoneGold, AiOutlineHome } from 'react-icons/ai'
import Logo from "@/assets/eraskon/IMG-20230608-WA0069-removebg-preview.png"
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"
import { BsReply } from 'react-icons/bs'


const SideNav = ({ }) => {
    const pathname = usePathname();
    // console.log({pathname})

  return (
    <div className='no-scrollbar hidden sm:flex flex-col justify-between grad-to-bottom text-white max-h-screen overflow-scroll h-screen min-w-[240px] w-60 pb-4'>
        <div>
            <div className='flex flex-col items-center w-full gap-5 py-8 text-center border-b border-white/10'>
                <Link href={"/"}>
                    <Image src={Logo} className='w-12 h-12 bg-transparent md:h-12' alt='' />
                </Link>
                <div className="flex items-center gap-2 text-xs">
                    {/* <span className='w-6 h-6 bg-white/30' /> */}
                    <div className="flex flex-col">
                        <span className='text-sm font-bold'>Administrator</span>
                        <span className='text-white/80 text-[10px] font-bold'>admin@gmail.com</span>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-2 pt-4 pb-2 text-white/70'>
                <Link className={`py-2.5 pl-6 text-sm flex items-center gap-2 ${(pathname === '/admin') && 'text-white'}`} href="/admin">
                    {/* <span className='flex items-center justify-center w-4 h-4 bg-white border rounded'>
                        <MdTrendingUp color='#000000' size={"0.6rem"} />
                    </span>  */}
                    <MdOutlineDashboardCustomize size={"1.3rem"} />
                    Dashboard
                </Link>
                <Link className={`py-2.5 pl-6 text-sm flex items-center gap-2 ${pathname.includes("advisory") && 'text-white'}`} href={"/admin/products"}>
                    <RiTeamLine size={"1.3rem"} />
                    Products
                </Link>
                <Link className={`py-2.5 pl-6 text-sm flex items-center gap-2 ${pathname.includes("cms") && 'text-white'}`} href={"/admin/cms"}>
                    <AiOutlineHome size={"1.3rem"} />
                    Home Content
                </Link>
                <Link className={`py-2.5 pl-6 text-sm flex items-center gap-2 ${pathname.includes("feedbacks") && 'text-white'}`} href={"/admin/feedbacks"}>
                    <MdOutlineFeedback size={"1.3rem"} />
                    Feedbacks
                </Link>
                <Link className={`py-2.5 pl-6 text-sm flex items-center gap-2 ${pathname.includes("contact") && 'text-white'}`} href={"/admin/contact"}>
                    <BsReply size={"1.3rem"} />
                    Messages
                </Link>
                <Link className={`py-2.5 pl-6 text-sm flex items-center gap-2 ${pathname.includes("faqs") && 'text-white'}`} href={"/admin/faqs"}>
                    <RiQuestionnaireLine size={"1.3rem"} />
                    FAQs
                </Link>
                {/* <Link className={`py-2.5 pl-6 text-sm flex items-center gap-2 text-white`} href={"/users/"}>
                    <RiTeamLine size={"1.3rem"} />
                    Settings
                </Link> */}
            </div>
        </div>
        <div onClick={() => signOut()} className={`py-2.5 pl-6 text-sm flex items-center gap-2 cursor-pointer`}>
            <MdLogout size={"1.3rem"} />
            Logout
        </div>
    </div>
  )
}

export default SideNav