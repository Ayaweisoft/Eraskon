import { use, useEffect, useState } from 'react'
import Head from "next/head";
import AdminLayout from "@/layouts/AdminLayout"
import AuthHOC from '@/components/AuthHOC'
import Table from '@/components/Table'
import { IFeedback } from "@/interfaces"
import usePost from '@/hooks/usePost';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader';
import Mailer from '@/components/Mailer';
import { useRouter } from 'next/router';

const Reply = () => {
  const [data, setData] = useState<IFeedback | null>(null)
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const router = useRouter()
  const { id } = router.query

  console.log({data})

  useEffect(() => {
    if (id) {
      setLoading(true)
      fetch(`/api/feedback/${id}`)
        .then(res => res.json())
        .then(data => {
          setData(data)
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
          setLoading(false)
        })
    }
  }, [id])

  return (
    <AdminLayout>
        {(loading) && <Loader modalOpen={true} />}
      <Head>
        <title>Eraskon</title>
        <meta name="description" content="Eraskon Nigeria Limited (ENL) is an indigenous Security and Logistics services provider in the Oil & Gas and Marine sectors of the Nigerian economy" />
        <link rel="icon" href="/faviconimg.png" />
      </Head>
      <div className='h-full p-4 py-12 overflow-y-auto sm:px-12'>
        <h1 className='mb-12 text-3xl text-black/70 font-argentinum'>Feedbacks</h1>
        <Mailer<IFeedback> data={data} />
      </div>
    </AdminLayout>
  );
}


export default AuthHOC(Reply)

