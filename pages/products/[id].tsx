import React, { useEffect, FormEvent, useState, useCallback, useReducer } from 'react'
import { MdChevronRight } from 'react-icons/md'
import Loader from '@/components/Loader'
import Image from 'next/image'
import { IProduct, IProductTest, IFeedback } from '@/interfaces'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useRouter } from 'next/router'
import Table from '@/components/Table'
import Button from '@/components/Button'
import usePost from '@/hooks/usePost';
import { toast } from 'react-toastify';
import { info } from 'console'
import jsPDF from 'jspdf';
import ReactToPdf from 'react-to-pdf'

const initialState: IProduct = {
  _id: null,
  name: '',
  description: '',
  image: '',
  performantFeature: '',
  testResults: [],
  testResultsImage: '',
  storage: '',
  sizes: []
}

const initialFeedbackState: IFeedback = {
  _id: null,
  productId: null,
  name: '',
  email: '',
  number: '',
  type: '',
  info: '',
}

type IAction = |
{ type: 'name', payload: string } |
{ type: 'email', payload: string } |
{ type: 'number', payload: string } |
{ type: 'number', payload: string } |
{ type: 'type', payload: string } |
{ type: 'info', payload: string } |
{ type: 'reset' }

const Product = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [feedback, dispatch] = useReducer((state: IFeedback, action: IAction) => {
    if (action.type === 'reset') {
      return initialFeedbackState
    }
    return { ...state, [action.type]: action.payload }
  }, initialFeedbackState)
  const ref = React.useRef(null as any)
  const handleGeneratePdf = () => {
		const doc = new jsPDF({
			format: 'a4',
			unit: 'px',
      orientation: 'landscape',
		});

		// Adding the fonts.
		doc.setFont('Inter-Regular', 'normal');

		doc.html(ref.current, {
			async callback(doc) {
				await doc.save('document');
			},
		});
	};

  const options = {
    orientation: 'landscape',
    unit: 'in',
    format: 'a4'
  };

  const [product, setProduct] = useState<IProduct>(initialState)

  const router = useRouter()
  const { id } = router.query

  const { loading: posting, error, data, post } = usePost({
    api: `/feedback`,
    method: 'POST',
    onSuccess: () => {
        toast('Feedback Submitted Successfully')
        dispatch({ type: 'reset' })
        router.push(`/products/${id}`)
    }
})

  const submitFeedback = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // dispatch({ type: 'description', payload: editorRef.current?.getContent() })
    console.log({ ...feedback, productId: id })
    post({ ...feedback, productId: id })
}

  const columns = [
    {
      name: "parameter",
      label: "Test Parameter",
      options: {
        filter: true,
        sort: true,
      },
      extra: true,
      custom: (val: string, meta: any) => {
        return (
          <p className="text-sm text-black/70">{val?.length < 40 ? val : val.slice(0, 40) + '...'}</p>
        )
      },
    },
    {
      name: "method",
      label: "Test Method",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "result",
      label: "Result",
      options: {
        filter: true,
        sort: false,
      },
    }
  ];


  const fetchProduct = useCallback(
    async () => {
      try {
        if (id) {
          setIsLoading(true)
          const res = await fetch(`/api/product/${id}`)
          const data = await res.json()
          if (!res.ok) {
            throw new Error(data?.message || 'An error Occured')
          }
          setProduct(data)
          console.log({ product })
        }
      } catch (error) {
        console.log({ error })
      }
      setIsLoading(false)
    },
    [id],
  )

  useEffect(() => {
    fetchProduct()
  }, [id, fetchProduct])

  return (
    <>
      <Header />
      {isLoading && <Loader modalOpen={isLoading} />}
      <main className='min-h-screen pt-24 my-8'>
        <div ref={ref} className="">
          <div className="flex flex-col justify-center gap-4 px-4 my-4 md:px-40">
            <div className="flex items-center justify-center">
              <img src={product?.image} className='w-[15rem] h-[15rem]' alt="" />
            </div>
            <h2 className='text-3xl font-extrabold text-blue'>{product?.name}</h2>
            <div className="flex">
              <p className='' dangerouslySetInnerHTML={{ __html: product?.description }}></p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold text-blue-light">Performant Features:</h2>
              <div className='' dangerouslySetInnerHTML={{ __html: product?.performantFeature }} ></div>
            </div>
          </div>
          <div className="flex flex-col gap-6 px-4 py-4 text-white bg-blue md:px-40">
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
              <div className="flex md:w-2/5">
                <img src={product?.testResultsImage} className='w-[10rem] h-[10rem]' alt="" />
              </div>
              <div className="flex flex-col w-full h-full gap-4">
                <div className="flex items-end justify-between w-full">
                  <h2 className="text-xl font-bold md:text-2xl">{product?.name}</h2>
                  <div className="flex gap-2">
                    {
                      product?.sizes.map((size, index) => (
                        <div key={index} className="flex items-center justify-center h-12 px-3 font-bold text-white rounded-md bg-blue-light">
                          {size} L
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className="flex w-full">
                  <Table<IProductTest> data={product?.testResults} columns={columns} isSearch={false} className={''} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:flex-row text-gold">
              <div className="">Storage:</div>
              <div className='text-white'>
                {product?.storage}
              </div>
            </div>
          </div>
        </div>
        <ReactToPdf targetRef={ref} filename="div-blue.pdf" options={options} x={.5} y={.5} scale={0.8}>
          {({toPdf}: {toPdf: any}) => (
            <Button className='p-3 m-4 font-medium text-white rounded-lg' onClick={toPdf}>Generate pdf</Button>
          )}
        </ReactToPdf>
        <Button onClick={handleGeneratePdf}>generate pdf 2</Button>
        <div className="flex flex-col w-full p-6">
          <h2 className='text-2xl font-bold text-blue'>Place a Request</h2>
          <form onSubmit={submitFeedback} className='w-full md:w-3/5'>
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-black/70">Name</label>
              <input required onChange={(e) => dispatch({ type: 'name', payload: e.target.value })} value={feedback?.name} type="text" name="name" id="name" className="p-2 border rounded-md border-black/20" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-black/70">Email</label>
              <input required onChange={(e) => dispatch({ type: 'email', payload: e.target.value })} value={feedback?.email} type="email" name="email" id="email" className="p-2 border rounded-md border-black/20" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="number" className="text-black/70">Phone</label>
              <input onChange={(e) => dispatch({ type: 'number', payload: e.target.value })} value={feedback?.number} type="number" name="number" id="number" className="p-2 border rounded-md border-black/20" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="info" className="text-black/70">Select type</label>
              <select name="type" id="type" onChange={(e) => dispatch({ type: 'type', payload: e.target.value })}>
                <option value="retail">Retail</option>
                <option value="distributor">Distributor</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="info" className="text-black/70">Additional Information</label>
              <textarea required onChange={(e) => dispatch({ type: 'info', payload: e.target.value })} value={feedback?.info} name="info" id="info" className="p-2 border rounded-md border-black/20" />
            </div>
            <div className="flex items-center gap-4 mt-8">
              <Button type='submit' className="px-4 py-2 text-sm text-white sm:px-6 rounded-xl">Submit Request</Button>
              <button onClick={() => dispatch({ type: 'reset' })} className="px-4 py-2 text-sm rounded-md text-black/60 sm:px-6">Clear</button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Product