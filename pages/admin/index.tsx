import { useEffect, useState } from 'react'
import Head from "next/head";
import AdminLayout from "@/layouts/AdminLayout"
import AuthHOC from '@/components/AuthHOC'
import Table from '@/components/Table'
import usePost from '@/hooks/usePost';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader';
import Image from 'next/image';
import WelcomeImg from '@/assets/welcome.svg'


const Home = () => {
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)



  return (
    <AdminLayout>
      <Head>
        <title>Eraskon</title>
        <meta name="description" content="Eraskon Nigeria Limited (ENL) is an indigenous Security and Logistics services provider in the Oil & Gas and Marine sectors of the Nigerian economy" />
        <link rel="icon" href="/faviconimg.png" />
      </Head>
      <div className='p-4 py-12 sm:px-12 h-full overflow-y-auto flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-black/70 text-center font-argentinum  mb-12'>Welcome to the Admin Dashboard</h1>
        <div className="flex justify-center">
          <Image src={WelcomeImg} alt='welcome image' className='w-2/3 md:w-1/2 md:h[90%]' />
        </div>
    
      </div>
    </AdminLayout>
  );
}


export default AuthHOC(Home)

