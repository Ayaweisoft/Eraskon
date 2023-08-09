import { FormEvent, useEffect, useReducer, useRef, useState } from 'react'
import Head from "next/head";
import AdminLayout from "@/layouts/AdminLayout"
import AuthHOC from '@/components/AuthHOC'
import Button from '@/components/Button';
import { useRouter } from 'next/router';
import { IProduct, IProductTest, IReducerAction } from '@/interfaces'
import usePost from '@/hooks/usePost';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader';
import useImage from '@/hooks/useImage';
import { Editor as TinyMCEEditor } from 'tinymce';
import TinyEditor from '@/components/Editor';
import Image from 'next/image';
import { MdOutlineDelete } from 'react-icons/md';



const initialState: IProduct = {
    _id: null,
    name: '',
    pdf: '',
    description: '',
    image: '',
    performantFeature: '',
    testResults: [],
    testResultsImage: '',
    storage: '',
    sizes: []
}

// type IAction = 'name' | 'description' | 'image' | 'performantFeature' | 'testResults' | 'testResultsImage' | 'storage' | 'sizes' | 'reset'

type IAction = |
{ type: 'name', payload: string } |
{ type: 'description', payload: string } |
{ type: 'image', payload: string } |
{ type: 'pdf', payload: string } |
{ type: 'performantFeature', payload: string } |
{ type: 'testResults', payload: IProductTest[] } |
{ type: 'testResultsImage', payload: string } |
{ type: 'storage', payload: string } |
{ type: 'sizes', payload: number[] } |
{ type: 'reset' }

const AddProduct = () => {
    const [testResult, setTestResults] = useState<IProductTest>({ parameter: "", method: "", result: "" })
    const [size, setSize] = useState<number | any>(null)
    const [product, dispatch] = useReducer((state: IProduct, action: IAction) => {
        if (action.type === 'reset') return initialState
        console.log({ action })
        console.log({ state })
        return { ...state, [action.type]: action.payload }
    }, initialState)

    const { url, setUrl, uploadImage, error: errorImage, progress, setError, loading: uploadingImage } = useImage()
    const { url: testResultsImage, setUrl: setTestResultsImage, uploadImage: uploadTestResultsImage, loading: uploadingTestResultsImage } = useImage()
    const { url: pdf, setUrl: setPdf, uploadImage: uploadPdf, loading: uploadingPdf } = useImage()

    const router = useRouter()
    const editorRef = useRef<TinyMCEEditor | null>(null);
    const performantFeatureRef = useRef<TinyMCEEditor | null>(null);

    // console.log({product, url})

    const { loading, error, data, post } = usePost({
        api: "/product",
        onSuccess: () => {
            toast('Product Added')
            dispatch({ type: 'reset' })
            editorRef.current?.setContent('')
            performantFeatureRef.current?.setContent('')
            setUrl('')
            setPdf('')
            setTestResultsImage('')
            router.push('/admin/products')
        }
    })

    const addProduct = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // dispatch({ type: 'description', payload: editorRef.current?.getContent() })
        console.log({ product })
        post({ ...product, description: editorRef.current?.getContent(), performantFeature: performantFeatureRef.current?.getContent() })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log({ testResult })
        dispatch({ type: 'testResults', payload: [...product.testResults, testResult] })
        console.log({ product: product })
        setTestResults({ parameter: "", method: "", result: "" })
    }

    const handleSizeSubmit = (e: any) => {
        e.preventDefault()

        dispatch({ type: 'sizes', payload: [...product.sizes, size] })
        setSize(null)
    }

    const handleSizeDelete = (index: number) => {
        const newSizes = product.sizes.filter((size, i) => i !== index)
        dispatch({ type: 'sizes', payload: newSizes })
    }

    const handleTestDelete = (index: number) => {
        const newTestResults = product.testResults.filter((test, i) => i !== index)
        dispatch({ type: 'testResults', payload: newTestResults })
    }

    useEffect(() => {
        if (url) {
            dispatch({ type: 'image', payload: url })
        }
    }, [url])

    useEffect(() => {
        if (testResultsImage) {
            dispatch({ type: 'testResultsImage', payload: testResultsImage })
        }
    }, [testResultsImage])

    useEffect(() => {
        if (pdf) {
            dispatch({ type: 'pdf', payload: pdf })
        }
    }, [pdf])


    return (
        <AdminLayout>
            <Head>
                <title>Eraskon</title>
                <meta name="description" content="Eraskon Nigeria Limited (ENL) is an indigenous Security and Logistics services provider in the Oil & Gas and Marine sectors of the Nigerian economy" />
                <link rel="icon" href="/faviconimg.png" />
            </Head>
            {(loading || uploadingImage) && <Loader modalOpen={true} />}
            <div className='h-full p-4 py-12 overflow-y-auto sm:px-12'>
                <div className="flex items-center justify-between gap-4 mb-16">
                    <h1 className='text-3xl text-black/70 font-argentinum'>Add Project</h1>
                    <Button onClick={() => router.push("/admin/products")} className="px-4 py-2 text-sm text-white sm:px-6 rounded-xl">View Product</Button>
                </div>
                <form className="flex flex-col gap-4" onSubmit={addProduct}>
                    <div className="flex flex-col gap-1">
                        <span className="text-black/70">Upload Image</span>
                        {product?.image &&
                            <Image width={100} height={100} src={product?.image} alt="" className="relative z-10 object-cover w-24 h-24 bg-gray-100" />
                        }
                        <input type='file' name='image' id='image' className='' onChange={(e) => uploadImage(e.target.files![0])} />
                        {/* {uploadingImage && <p>Uploading Image {progress}%</p>} */}
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-black/70">Upload Data Sheet</span>
                        <input type='file' name='pdf' id='pdf' className='' onChange={(e) => uploadPdf(e.target.files![0])} />
                        {/* {uploadingImage && <p>Uploading Image {progress}%</p>} */}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="text-black/70">Name</label>
                        <input required onChange={(e) => dispatch({ type: 'name', payload: e.target.value })} value={product?.name} type="text" name="name" id="name" className="p-2 border rounded-md border-black/20" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="title" className="text-black/70">Storage</label>
                        <input required onChange={(e) => dispatch({ type: 'storage', payload: e.target.value })} value={product?.storage} type="text" name="storage" id="storage" className="p-2 border rounded-md border-black/20" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="description" className="text-black/70">Description</label>
                        {/* <textarea rows={5} required onChange={(e) => dispatch({ type: 'description', payload: e.target.value })} value={product?.description} name="description" id="description" className="p-2 border rounded-md border-black/20" /> */}
                        <TinyEditor editorRef={editorRef} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="performantFeature" className="text-black/70">Performant Feature</label>
                        {/* <textarea rows={5} required onChange={(e) => dispatch({ type: 'description', payload: e.target.value })} value={product?.description} name="description" id="description" className="p-2 border rounded-md border-black/20" /> */}
                        <TinyEditor editorRef={performantFeatureRef} />
                    </div>
                    <div className="flex flex-col gap-2 p-4 border rounded-lg border-slate-400">
                        {product.testResults?.map((testResult, index: number) => (
                            <div key={index} className="flex flex-col gap-1 p-4 mb-3 border rounded-lg border-slate-400">
                                <div className="flex items-center justify-between w-full">
                                    <h2>Test Data {index + 1}</h2>
                                    <MdOutlineDelete onClick={() => handleTestDelete(index)} size="1.2rem" className="text-red-400 cursor-pointer" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="title" className="text-black/70">Test Parameter</label>
                                    <input required onChange={(e) => setTestResults({ ...testResult, parameter: e.target.value })} value={testResult?.parameter} type="text" name="parameter" id="parameter" className="p-2 border rounded-md border-black/20" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="title" className="text-black/70">Test Parameter</label>
                                    <input required onChange={(e) => setTestResults({ ...testResult, parameter: e.target.value })} value={testResult?.parameter} type="text" name="parameter" id="parameter" className="p-2 border rounded-md border-black/20" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="title" className="text-black/70">Test Parameter</label>
                                    <input required onChange={(e) => setTestResults({ ...testResult, parameter: e.target.value })} value={testResult?.parameter} type="text" name="parameter" id="parameter" className="p-2 border rounded-md border-black/20" />
                                </div>
                            </div>
                        ))}

                        <div className="flex flex-col gap-1">
                            <label htmlFor="title" className="text-black/70">Test Parameter</label>
                            <input onChange={(e) => setTestResults({ ...testResult, parameter: e.target.value })} value={testResult?.parameter} type="text" name="parameter" id="parameter" className="p-2 border rounded-md border-black/20" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="title" className="text-black/70">Test Method</label>
                            <input onChange={(e) => setTestResults({ ...testResult, method: e.target.value })} value={testResult?.method} type="text" name="method" id="method" className="p-2 border rounded-md border-black/20" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="title" className="text-black/70">Test Result</label>
                            <input onChange={(e) => setTestResults({ ...testResult, result: e.target.value })} value={testResult?.result} type="text" name="result" id="result" className="p-2 border rounded-md border-black/20" />
                        </div>
                        <Button onClick={(e) => handleSubmit(e)} className="px-4 py-2 text-sm text-white sm:px-6 rounded-xl">Add Test Result</Button>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="title" className="text-black/70">Enter Sizes</label>
                        <div className="flex">
                            <input onChange={(e) => setSize(e.target.value)} type="number" name="size" id="size" value={size} className="p-2 border rounded-md border-black/20" />
                            <Button onClick={(e) => handleSizeSubmit(e)} className="px-4 py-2 text-sm text-white sm:px-6 rounded-xl">Add Size</Button>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            {product?.sizes?.map((size, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="flex items-center justify-center gap-3 p-2 text-white rounded-lg bg-blue-light">
                                        <p>{size}L</p>
                                        <MdOutlineDelete onClick={() => handleSizeDelete(index)} size="1.2rem" className="text-red-400 cursor-pointer" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-black/70">Upload Test Result Image</span>
                        {product?.testResultsImage &&
                            <Image width={100} height={100} src={product?.testResultsImage} alt="" className="relative z-10 object-cover w-24 h-24 bg-gray-100" />
                        }
                        <input type='file' name='testResultsImage' id='testResultsImage' className='' onChange={(e) => uploadTestResultsImage(e.target.files![0])} />
                        {/* {uploadingImage && <p>Uploading Image {progress}%</p>} */}
                    </div>
                    <div className="flex items-center gap-4 mt-8">
                        {uploadingTestResultsImage || uploadingPdf || loading ? (
                            <Button type='submit' disabled className="px-4 py-2 text-sm bg-[#58585e] text-white sm:px-6 rounded-xl">Loading...</Button>
                        ) : (
                            <Button type='submit' className="px-4 py-2 text-sm text-white sm:px-6 rounded-xl">Add Product</Button>
                        )}
                        <button onClick={() => dispatch({ type: 'reset' })} className="px-4 py-2 text-sm rounded-md text-black/60 sm:px-6">Clear</button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}


export default AuthHOC(AddProduct)
