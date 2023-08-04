import React, { useEffect, useState } from 'react'
import { MdChevronRight } from 'react-icons/md'
import Loader from '@/components/Loader'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useRouter } from 'next/router'


const NewsPost = () => {
    const [news, setNews] = useState<any>({})
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const router = useRouter()
    const { id } = router.query
  
    useEffect(() => {
      const fetchNews = async () => {
        setIsLoading(true)
        try {
          const res = await fetch(`/api/news/${id}`)
          const data = await res.json()
          if (!res.ok) {
            throw new Error(data?.message || 'An error Occured')
          }
          setNews(data)
        } catch (error) {
          console.log({error})
        }
        setIsLoading(false)
      }
  
      fetchNews()
    }, [])
  
    // console.log('Newss', Newss)

  return (
    <>
      <Header />
      {isLoading && <Loader modalOpen={isLoading} />}
      <div className='py-10 px-4 md:py-12 mt-[70px] md:mt-[88px] max-w-[1000px] mx-auto'>
        <div className='flex items-center gap-1 mb-5 text-xs'>
            News
            <MdChevronRight size="1.3rem" />
            <span className='font-medium'>
                Category    
            </span>
        </div>
        <h1 className='text-3xl font-semibold mb-12'>{news?.title}</h1>
        <div className='flex items-center justify-between text-xs'>
            <div className='flex items-center gap-3'>
                <span className='w-10 h-10 rounded-full bg-gray'></span>
                <div className='flex gap-1 flex-col'>
                    <span className='font-semibold'>{news?.author}</span>
                    <p>4 min - 5 min read</p>
                </div>
            </div>
            {/* <div className='flex items-center gap-2'>
                <span>twit</span>
                <span>twit</span>
            </div> */}
        </div>
      </div>
      <section className='px-4 py-12 md:px-10 lg:px-24'>
        <Image className='w-full object-cover md:object-contain object-center min-h-[400px] max-h-[700px]' src={news.image} height={128} width={128} alt="" />
      </section>
      <main>
          <section className='px-4 py-12 md:px-10 lg:px-24 max-w-[1000px] mx-auto'>
            <div dangerouslySetInnerHTML={{ __html: news?.content }}></div>
        </section>
        <section className='px-4 py-12 md:px-10 lg:px-24 max-w-[1000px] mx-auto'>
            {/* <div className='pb-10 mb-10 border-b-2 border-gray'>
                <span className='block font-semibold text-sm mb-2'>Share this post</span>
                <div className='flex justify-between items-center'>
                    <Share />
                </div>
            </div> */}
            {/* <div className='flex items-center gap-3 text-xs'>
                <span className='w-10 h-10 rounded-full bg-gray'></span>
                <div className='flex flex-col'>
                    <span className='font-semibold'>{news?.author}</span>
                    <p>Media Director</p>
                </div>
            </div> */}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default NewsPost