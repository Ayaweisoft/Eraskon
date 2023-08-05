import { useEffect, useState } from 'react'
import Head from "next/head";
import AdminLayout from "@/layouts/AdminLayout"
import AuthHOC from '@/components/AuthHOC'
import Table from '@/components/Table'
import { IFeedback } from "@/interfaces"
import usePost from '@/hooks/usePost';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader';
import { BsReply } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useRouter } from 'next/router';

const Feedbacks = () => {
  const [data, setData] = useState<IFeedback[]>([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const router = useRouter()

  const { loading: posting, error, post, data: deleted } = usePost({ 
    api: "/feedbacks",
    method: "DELETE",
    onSuccess: () => {
        toast('Feedbacks deleted successfully')
    }
})

const deleteFeedbacks = (id: string, route: string) => {
    post({
      id,
    }, route)
}


const columns = [
  {
    name: "name",
    label: "Name",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "email",
    label: "Email",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "number",
    label: "Number",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "info",
    label: "Info",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "type",
    label: "Type",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "delete",
    label: "Action",
    extra: true,
    custom: (val: string, meta: any) => {
      return  (
        <div className="flex items-center gap-4 justify-left">
          <BsReply onClick={() => router.push(`/admin/feedbacks/${meta?._id}`)} size="1.2rem" className="cursor-pointer" />
          <MdOutlineDelete onClick={() => deleteFeedbacks(meta?._id, `feedback/${meta?._id}`)} size="1.2rem" className="text-red-400 cursor-pointer" />
        </div>
      )
    },
  },
  
];

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/feedback`)
        const data = await res.json()
        
        if (!res.ok) throw new Error(data.message)

        console.log({data})
        setData(data)
      } catch (error) {
        console.log({error})
      }
      setLoading(false)
    }

    fetchFeedbacks()
  }, [deleted])



  return (
    <AdminLayout>
        {(loading || posting) && <Loader modalOpen={true} />}
      <Head>
        <title>Eraskon</title>
        <meta name="description" content="Eraskon Nigeria Limited (ENL) is an indigenous Security and Logistics services provider in the Oil & Gas and Marine sectors of the Nigerian economy" />
        <link rel="icon" href="/faviconimg.png" />
      </Head>
      <div className='h-full p-4 py-12 overflow-y-auto sm:px-12'>
        <h1 className='mb-12 text-3xl text-black/70 font-argentinum'>Feedbacks</h1>
        <Table<IFeedback> data={data} columns={columns} className={''} />
      </div>
    </AdminLayout>
  );
}


export default AuthHOC(Feedbacks)

