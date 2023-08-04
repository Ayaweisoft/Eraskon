import { IAmbassador } from '@/interfaces'
import Image from 'next/image'
import React, {useEffect, useState} from 'react'

const Ambassadors = () => {
    const [ambassadors, setAmbassadors] = useState<IAmbassador[]>([])

    useEffect(() => {
      const fetchAmbassadors = async () => {
        try {
          const res = await fetch('/api/ambassadors')
          const data = await res.json()
          if (!res.ok) {
            throw new Error(data?.message || 'An error Occured')
          }
          setAmbassadors(data)
        } catch (error) {
          console.log({error})
        }
        
      }
  
      fetchAmbassadors()
    }, [])
  
    // console.log({ambassadors})
  return (
    <section className="section pt-20 pb-20 text-center">
      <div className="flex flex-col items-center gap-4 max-w-3xl mx-auto text-center">
        <h3 className="text-3xl md:text-5xl font-extrabold capitalize mb-3">Our <br /> Ambassadors</h3>
        <p>We are delighted to introduce our exceptional scholarship ambassadors, a group of outstanding individuals who have distinguished themselves through their remarkable achievements and unwavering commitment to excellence. Chosen from a pool of highly talented applicants, these scholars have demonstrated exceptional academic prowess, leadership abilities, and a strong dedication to their communities. </p>
      </div>
      <div className="flex flex-col gap-10 md:gap-16 pt-12">
        {ambassadors?.map((ambassador, index) => (
          <div key={index} className="flex flex-col gap-4 lg:gap-12 md:items-center lg:flex-row">
            <div className='flex flex-col gap-4 items-center justify-center text-center lg:text-left lg:items-start flex-[1_1_0%]'>
            <Image width={100} height={100} alt='' src={ambassador?.image} className="h-44 w-44 md:w-48 md:h-48 rounded-full mx-auto md:rounded-none object-cover md:mx-0 bg-black/10" />
              
              <div>
              {/* <h4 className="text-3xl font-bold">{ambassador?.name}</h4>
              <span className="text-primary font-bold text-xl">{ambassador?.title}</span> */}
              <h4 className="text-xl font-bold">{ambassador?.name}</h4>
                  <span className="text-primary text-sm font-extrabold">{ambassador?.title}</span>
              </div>
            </div> 
            <div className='text-[#6D6D6D] font-argentinum text-sm md:text-base md:text-left flex-[3_1_0%]' dangerouslySetInnerHTML={{ __html: ambassador?.description }}  />    
          </div>
        ))
        }
    </div>
   </section>
  )
}


export default Ambassadors

{/* 
 <div className="flex flex-col md:flex-row md:justify-center items-center gap-8 pt-12">
<div key={index} className="max-w-sm flex flex-col gap-4 justify-center">
            <Image width={100} height={100}  src={ambassador?.image} alt="" className="h-44 w-44 md:w-48 md:h-48 lg:h-72 lg:w-72 rounded-full bg-black/10" />
            <div>
              <h4 className="text-3xl font-bold">{ambassador?.name}</h4>
              <span className="text-primary font-bold text-xl">{ambassador?.title}</span>
            </div>
            <div key={index} className="flex flex-col gap-4 md:gap-12 md:flex-row">
              <div className='flex flex-col gap-4 items-center justify-center text-center md:text-left md:items-start flex-[1_1_0%]'>
                  <Image width={100} height={100} alt='' src={advisory?.image} className="h-44 w-44 md:w-48 md:h-48 lg:h-72 lg:w-72 rounded-full mx-auto md:rounded-none object-cover md:mx-0 bg-black/10" />
                <div>
                  <h4 className="text-sm mb-3">{advisory?.name}</h4>
                  <span className="text-[#6D6D6D] text-sm font-extrabold">{advisory?.title}</span>
                </div>
              </div> 
              <div className='text-[#6D6D6D] font-argentinum text-sm md:text-base md:text-left flex-[3_1_0%]' dangerouslySetInnerHTML={{ __html: advisory?.description }}  />    
            </div>
          </div> */}