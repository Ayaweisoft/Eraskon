import { useEffect, useState } from 'react'
import Head from "next/head";
import AdminLayout from "@/layouts/AdminLayout"
import AuthHOC from '@/components/AuthHOC'
import Table from '@/components/Table'
import { IProduct } from "@/interfaces"
import Button from '@/components/Button';
import { useRouter } from 'next/router';
import usePost from '@/hooks/usePost';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader';
import Product from '@/components/ProductCard';
import { BiEdit } from 'react-icons/bi';
import Link from 'next/link';
import { MdOutlineDelete } from 'react-icons/md';

const Products = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IProduct[]>([])
  const router = useRouter()

  const { loading: posting, error, post, data: deleted } = usePost({
    api: "/product",
    method: "DELETE",
    onSuccess: () => {
      toast('Product deleted successfully')
    }
  })

  const deleteProduct = (id: string, route: string) => {
    post({
      id,
    }, route)
  }

  const handleDelete = (id: string) => {
    deleteProduct(id, `product/${id}`)
  }

  const handleEdit = (id: string) => {
    router.push(`/admin/products/${id}`)
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/product`)
        const data = await res.json()

        if (!res.ok) throw new Error(data.message)

        console.log({ data })
        setData(data)
      } catch (error) {
        console.log({ error })
      }
      setLoading(false)
    }

    fetchUser()
  }, [deleted])

  return (
    <AdminLayout>
      <Head>
        <title>Eraskon</title>
        <meta name="description" content="Product Admin Page" />
        <link rel="icon" href="/faviconimg.png" />
      </Head>
      {(loading || posting) && <Loader modalOpen={true} />}
      <div className='p-4 py-12 sm:px-12 h-full overflow-y-auto'>
        <div className="flex items-center gap-4 justify-between mb-16">
          <h1 className='text-3xl text-black/70 font-argentinum'>Products</h1>
          <Button onClick={() => router.push("/admin/products/add")} className="text-white px-4 sm:px-6 py-2 rounded-xl text-sm whitespace-nowrap">Add Product</Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {
            data.length > 0 ? (
              data.map((item: IProduct, index: number) => (
                <Product key={index} product={item} mode="admin" handleDelete={handleDelete} handleEdit={handleEdit} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-argentinum">No Products</h1>
                <Button onClick={() => router.push("/admin/products/add")} className="text-white px-4 sm:px-6 py-2 rounded-xl text-sm whitespace-nowrap">Add Product</Button>
              </div>  
            )
          }
        </div>
      </div>
    </AdminLayout>
  );
}


export default AuthHOC(Products)

