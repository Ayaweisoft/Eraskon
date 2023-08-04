import { FormEvent, useEffect, useReducer, useRef, useState, useCallback } from 'react'
import Head from "next/head";
import AdminLayout from "@/layouts/AdminLayout"
import AuthHOC from '@/components/AuthHOC'
import Button from '@/components/Button';
import { useRouter } from 'next/router';
import { IProduct, IProductTest } from '@/interfaces'
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
{ type: 'performantFeature', payload: string } |
{ type: 'testResults', payload: IProductTest[] } |
{ type: 'testResultsImage', payload: string } |
{ type: 'storage', payload: string } |
{ type: 'sizes', payload: number[] } |
{ type: 'reset' } |
{ type: "update", payload: any }

const EditBoardMember = () => {
    const [loading, setLoading] = useState(false)
    const [testResult, setTestResults] = useState<IProductTest>({ parameter: "", method: "", result: "" })
    const [size, setSize] = useState<number | any>(null)
    const [product, dispatch] = useReducer((state: IProduct, action: IAction) => {
        if (action.type === 'reset') return initialState
        if (action.type === 'update') return { ...state, ...action.payload }
        console.log({ action })
        console.log({ state })
        return { ...state, [action.type]: action.payload }
    }, initialState)
    const { url, setUrl, uploadImage, error: errorImage, progress, setError, loading: uploadingImage } = useImage()
    const { url: testResultsImage, setUrl: setTestResultsImage, uploadImage: uploadTestResultsImage, loading: uploadingTestResultsImage } = useImage()

    const router = useRouter()
    const { id } = router.query

    const editorRef = useRef<TinyMCEEditor | null>(null);
    const performantFeatureRef = useRef<TinyMCEEditor | null>(null);

    const { loading: posting, error, data, post } = usePost({
        api: `/product/${id}`,
        method: 'PATCH',
        onSuccess: () => {
            toast('Product Added')
            dispatch({ type: 'reset' })
            editorRef.current?.setContent('')
            performantFeatureRef.current?.setContent('')
            setUrl('')
            setTestResultsImage('')
            router.push('/admin/products')
        }
    })

    const addProduct = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // dispatch({ type: 'description', payload: editorRef.current?.getContent() })
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
        const newSizes = product.sizes.filter((size: number , i: number) => i !== index)
        dispatch({ type: 'sizes', payload: newSizes })
    }

    const handleTestDelete = (index: number) => {
        const newTestResults = product.testResults.filter((test: number, i: number) => i !== index)
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

    const fetchProduct = useCallback(
        async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/product/${id}`)
                const data = await res.json()

                if (!res.ok) throw new Error(data.message)

                dispatch({ type: 'update', payload: data })

                editorRef.current?.setContent(data.description)
                performantFeatureRef.current?.setContent(data.performantFeature)
                console.log({ product })
            } catch (error) {
                console.log({ error })
            }
            setLoading(false)
        },
        [id],
    )

    useEffect(() => {
        fetchProduct()
    }, [id, fetchProduct])

    return (
        <AdminLayout>
            <Head>
                <title>Eraskon</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/faviconimg.png" />
            </Head>
            {(posting || loading || uploadingImage) && <Loader modalOpen={true} />}
            <div className='p-4 py-12 sm:px-12 h-full overflow-y-auto'>
                <div className="flex items-center gap-4 justify-between mb-16">
                    <h1 className='text-3xl text-black/70 font-argentinum'>Edit Product</h1>
                    <Button onClick={() => router.push("/admin/products")} className="text-white px-4 sm:px-6 py-2 rounded-xl text-sm">View Product</Button>
                </div>
                <form className="flex flex-col gap-4" onSubmit={addProduct}>
                    <div className="flex flex-col gap-1">
                        <span className="text-black/70">Upload Image</span>
                        {product?.image &&
                            <Image width={100} height={100} src={product?.image} alt="" className="h-24 w-24 bg-gray-100 object-cover z-10 relative" />
                        }
                        <input type='file' name='image' id='image' className='' onChange={(e) => uploadImage(e.target.files![0])} />
                        {/* {uploadingImage && <p>Uploading Image {progress}%</p>} */}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="text-black/70">Name</label>
                        <input required onChange={(e) => dispatch({ type: 'name', payload: e.target.value })} value={product?.name} type="text" name="name" id="name" className="border border-black/20 rounded-md p-2" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="title" className="text-black/70">Storage</label>
                        <input required onChange={(e) => dispatch({ type: 'storage', payload: e.target.value })} value={product?.storage} type="text" name="storage" id="storage" className="border border-black/20 rounded-md p-2" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="description" className="text-black/70">Description</label>
                        {/* <textarea rows={5} required onChange={(e) => dispatch({ type: 'description', payload: e.target.value })} value={product?.description} name="description" id="description" className="border border-black/20 rounded-md p-2" /> */}
                        <TinyEditor editorRef={editorRef} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="performantFeature" className="text-black/70">Performant Feature</label>
                        {/* <textarea rows={5} required onChange={(e) => dispatch({ type: 'description', payload: e.target.value })} value={product?.description} name="description" id="description" className="border border-black/20 rounded-md p-2" /> */}
                        <TinyEditor editorRef={performantFeatureRef} />
                    </div>
                    <div className="flex flex-col gap-2 border border-slate-400 rounded-lg p-4">
                        {product.testResults?.map((testResult: IProductTest, index: number) => (
                            <div key={index} className="flex flex-col gap-1 mb-3 border border-slate-400 rounded-lg p-4">
                                <div className="flex justify-between items-center w-full">
                                    <h2>Test Data {index + 1}</h2>
                                    <MdOutlineDelete onClick={() => handleTestDelete(index) } size="1.2rem" className="text-red-400 cursor-pointer" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="title" className="text-black/70">Test Parameter</label>
                                    <input required onChange={(e) => setTestResults({ ...testResult, parameter: e.target.value })} value={testResult?.parameter} type="text" name="parameter" id="parameter" className="border border-black/20 rounded-md p-2" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="title" className="text-black/70">Test Parameter</label>
                                    <input required onChange={(e) => setTestResults({ ...testResult, parameter: e.target.value })} value={testResult?.parameter} type="text" name="parameter" id="parameter" className="border border-black/20 rounded-md p-2" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="title" className="text-black/70">Test Parameter</label>
                                    <input required onChange={(e) => setTestResults({ ...testResult, parameter: e.target.value })} value={testResult?.parameter} type="text" name="parameter" id="parameter" className="border border-black/20 rounded-md p-2" />
                                </div>
                            </div>
                        ))}

                        <div className="flex flex-col gap-1">
                            <label htmlFor="title" className="text-black/70">Test Parameter</label>
                            <input onChange={(e) => setTestResults({ ...testResult, parameter: e.target.value })} value={testResult?.parameter} type="text" name="parameter" id="parameter" className="border border-black/20 rounded-md p-2" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="title" className="text-black/70">Test Method</label>
                            <input onChange={(e) => setTestResults({ ...testResult, method: e.target.value })} value={testResult?.method} type="text" name="method" id="method" className="border border-black/20 rounded-md p-2" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="title" className="text-black/70">Test Result</label>
                            <input onChange={(e) => setTestResults({ ...testResult, result: e.target.value })} value={testResult?.result} type="text" name="result" id="result" className="border border-black/20 rounded-md p-2" />
                        </div>
                        <Button onClick={(e) => handleSubmit(e)} className="text-white px-4 sm:px-6 py-2 rounded-xl text-sm">Add Test Result</Button>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="title" className="text-black/70">Enter Sizes</label>
                        <div className="flex">
                            <input onChange={(e) => setSize(e.target.value) } type="number" name="size" id="size" value={size} className="border border-black/20 rounded-md p-2" />
                            <Button onClick={(e) => handleSizeSubmit(e)} className="text-white px-4 sm:px-6 py-2 rounded-xl text-sm">Add Size</Button>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                            {product?.sizes?.map((size: number, index: number) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="flex justify-center text-white gap-3 bg-blue-light rounded-lg items-center p-2">
                                        <p>{size}L</p>
                                        <MdOutlineDelete onClick={() => handleSizeDelete(index) } size="1.2rem" className="text-red-400 cursor-pointer" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-black/70">Upload Test Result Image</span>
                        {product?.testResultsImage &&
                            <Image width={100} height={100} src={product?.testResultsImage} alt="" className="h-24 w-24 bg-gray-100 object-cover z-10 relative" />
                        }
                        <input type='file' name='testResultsImage' id='testResultsImage' className='' onChange={(e) => uploadTestResultsImage(e.target.files![0])} />
                        {/* {uploadingImage && <p>Uploading Image {progress}%</p>} */}
                    </div>
                    <div className="flex items-center gap-4 mt-8">
                        <Button type='submit' className="text-white px-4 sm:px-6 py-2 rounded-xl text-sm">Add Product</Button>
                        <button onClick={() => dispatch({ type: 'reset' })} className="text-black/60 px-4 sm:px-6 py-2 rounded-md text-sm">Clear</button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}


export default AuthHOC(EditBoardMember)
