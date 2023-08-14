import { FormEvent, useEffect, useReducer, useState } from 'react'
import Head from "next/head";
import AdminLayout from "@/layouts/AdminLayout"
import AuthHOC from '@/components/AuthHOC'
import Button from '@/components/Button';
import { useRouter } from 'next/router';
import { ICms, IReducerAction } from '@/interfaces'
import usePost from '@/hooks/usePost';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader';
import useImage from '@/hooks/useImage';
import Image from 'next/image';


const initialState: ICms = {
    _id: null,
    hero: {
        image: [],
        header: '',
        text: '',
    },
    whoWeAre: {
        text: '',
        image: '',
    },
    whatWeDo: {
        text: '',
        image: '',
    },
}

// type IAction = 'hero' | 'whoWeAre' | 'whatWeDo' | 'update'
type IAction = |
{ type: 'hero', payload: string | string[] } |
{ type: 'whoWeAre', payload: string } |
{ type: 'whatWeDo', payload: string } |
{ type: 'update', payload: any }

const EditCms = () => {
    const [loading, setLoading] = useState(false)
    const [cms, dispatch] = useReducer((state: ICms, action: IAction) => {
        if (action.type === 'update' && typeof action.payload !== 'string') {
            return { ...state, ...action.payload }
        }
        return { ...state, [action.type]: action.payload }
    }, initialState)
    const { url: heroImage, uploadImage, error: errorImage, progress, setError, loading: uploadingImage } = useImage()
    const { url: whoWeAreImage, setUrl: setWhoWeAreImage, progress: whoWeAreProgress, uploadImage: uploadWhoWeAreImage, loading: uploadingWhoWeAreImage } = useImage()
    const { url: whatWeDoImage, setUrl: setWhatWeDoImage, progress: whatWeDoProgress, uploadImage: uploadWhatWeDoImage, loading: uploadingWhatWeDoImage } = useImage()

    const router = useRouter()
    const { loading: posting, error, data, post } = usePost({
        api: `/cms/${cms?._id || ''}`,
        method: 'PATCH',
        onSuccess: () => {
            toast('Updated successfully')
        }
    })

    const updateWhoWeAre = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        post({
            whoWeAre: cms.whoWeAre
        })
    }

    const updateWhatWeDo = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        post({
            whatWeDo: cms.whatWeDo
        })
    }

    const updateHero = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        post({
            hero: cms.hero
        })
    }


    useEffect(() => {
        if (heroImage) {
            dispatch({ type: 'hero', payload: [...cms.hero.image, heroImage]})
        }
    }, [heroImage])

    useEffect(() => {
        if (whoWeAreImage) {
            dispatch({ type: 'whoWeAre', payload: { ...cms.whoWeAre, image: whoWeAreImage } })
        }
    }, [whoWeAreImage])

    useEffect(() => {
        if (whatWeDoImage) {
            dispatch({ type: 'whatWeDo', payload: { ...cms.whatWeDo, image: whatWeDoImage } })
        }
    }, [whatWeDoImage])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/cms`)
                const data = await res.json()

                if (!res.ok) throw new Error(data.message)

                console.log({ data })
                dispatch({ type: 'update', payload: data[0] })
            } catch (error) {
                console.log({ error })
            }
            setLoading(false)
        }
        fetchData()
    }, [])

    return (
        <AdminLayout>
            <Head>
                <title>Eraskon</title>
                <meta name="description" content="Engine Pil Company" />
                <link rel="icon" href="/faviconimg.png" />
            </Head>
            {(loading || posting || uploadingImage) && <Loader modalOpen={true} />}
            <div className='h-full p-4 py-12 overflow-y-auto sm:px-12'>

                {/* <section className="pb-10 border-b">
                    <h1 className='mb-6 text-2xl text-black/70 font-argentinum'>Hero Section</h1>
                    <form className="flex flex-col gap-4" onSubmit={updateHero}>
                        <div className="flex flex-col gap-1">
                            <span className="text-black/70">Upload Hero Images</span>
                            <div className="flex">    
                            </div>
                            <input type='file' name='whoWeAreImage' id='whoWeAreImage' className='' onChange={(e) => uploadWhoWeAreImage(e.target.files![0])} />
                            {uploadingWhoWeAreImage && <p>Uploading Image {whoWeAreProgress}%</p>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="header" className="text-black/70">Header</label>
                            <input minLength={10} maxLength={45} required onChange={(e) => dispatch({ type: 'hero', payload: { ...cms.hero, header: e.target.value } })} value={cms?.hero?.header} type="text" name="header" id="header" className="p-2 border rounded-md border-black/20" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="text" className="text-black/70">Text</label>
                            <textarea minLength={200} maxLength={450} rows={3} required onChange={(e) => dispatch({ type: 'hero', payload: { ...cms.hero, text: e.target.value } })} value={cms?.hero?.text} name="text" id="text" className="p-2 border rounded-md border-black/20" />
                        </div>
                        <div className="flex items-center gap-4">
                            <Button type='submit' className="px-4 py-2 text-sm text-white sm:px-6 rounded-xl">Update</Button>
                        </div>
                    </form>
                </section> */}
                <section className="py-10 border-b">
                    <h1 className='mb-6 text-2xl text-black/70 font-argentinum'>Who We Are Section</h1>
                    <form className="flex flex-col gap-4" onSubmit={updateWhoWeAre}>
                        <div className="flex flex-col gap-1">
                            <span className="text-black/70">Upload Who We Are Image</span>
                            {cms?.whoWeAre?.image &&
                                <Image width={100} height={100} src={cms?.whoWeAre?.image} alt="" className="relative z-10 object-cover w-24 h-24 bg-gray-100" />
                            }
                            <input type='file' name='whoWeAreImage' id='whoWeAreImage' className='' onChange={(e) => uploadWhoWeAreImage(e.target.files![0])} />
                            {uploadingWhoWeAreImage && <p>Uploading Image {whoWeAreProgress}%</p>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="text" className="text-black/70">Text</label>
                            <textarea minLength={200} maxLength={450} rows={3} required onChange={(e) => dispatch({ type: 'whoWeAre', payload: { ...cms.whoWeAre, text: e.target.value } })} value={cms?.whoWeAre?.text} name="text" id="text" className="p-2 border rounded-md border-black/20" />
                        </div>
                        <div className="flex items-center gap-4">
                            <Button type='submit' className="px-4 py-2 text-sm text-white sm:px-6 rounded-xl">Update</Button>
                        </div>
                    </form>
                </section>

                <section className="py-10 border-b">
                    <h1 className='mb-6 text-2xl text-black/70 font-argentinum'>What We Do Section</h1>
                    <form className="flex flex-col gap-4" onSubmit={updateWhatWeDo}>
                        <div className="flex flex-col gap-1">
                            <span className="text-black/70">Upload What We Do Image</span>
                            {cms?.whatWeDo.image &&
                                <Image width={100} height={100} src={cms?.whatWeDo?.image} alt="" className="relative z-10 object-cover w-24 h-24 bg-gray-100" />
                            }
                            <input type='file' name='whatWeDoImage' id='whatWeDoImage' className='' onChange={(e) => uploadWhatWeDoImage(e.target.files![0])} />
                            {uploadingWhatWeDoImage && <p>Uploading Image {whatWeDoProgress}%</p>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="text" className="text-black/70">Text</label>
                            <textarea minLength={200} maxLength={450} rows={3} required onChange={(e) => dispatch({ type: 'whatWeDo', payload: { ...cms.whatWeDo, text: e.target.value } })} value={cms?.whatWeDo?.text} name="text" id="text" className="p-2 border rounded-md border-black/20" />
                        </div>
                        <div className="flex items-center gap-4">
                            <Button type='submit' className="px-4 py-2 text-sm text-white sm:px-6 rounded-xl">Update</Button>
                        </div>
                    </form>
                </section>
            </div>
        </AdminLayout>
    );
}


export default AuthHOC(EditCms)
// export default EditCms
