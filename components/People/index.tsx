import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import VisionImg from "@/assets/vision.png"


const People = () => {
  return (
    <section className="pb-20 text-center section">
    <div className="flex flex-col items-center max-w-3xl gap-4 mx-auto text-center">
      <h3 className="mb-3 text-3xl font-extrabold capitalize md:text-5xl">Our People</h3>
      <p>Meet the visionary leaders who drive Eraskon Nigeria Limited towards excellence and innovation:</p>
    </div>
    <Carousel autoPlay infiniteLoop interval={5000} showThumbs={false}>
      <div key={1} className="flex flex-col gap-10 pt-12 md:gap-16">
        <div className="flex flex-col items-center gap-4 lg:gap-12 lg:flex-row">
          <div className='flex flex-col gap-4 items-center justify-center text-center lg:text-left lg:items-start flex-[1_1_0%]'>
            <Image width={100} height={100} alt='' src={VisionImg} className="object-cover mx-auto rounded-full h-44 w-44 md:w-48 md:h-48 md:rounded-none md:mx-0 bg-black/10" />
            <div>
              <h4 className="text-xl font-bold">{'Maxwell Oko'}</h4>
              <span className="text-sm font-extrabold text-primary">{'Chairman'}</span>
            </div>
          </div> 
          <div className='text-[#6D6D6D] font-argentinum text-sm md:text-base md:text-left flex-[3_1_0%]'>
          <p className='text-sm md:text-base'>Maxwell Oko&apos;s journey encompasses architecture, public service, and entrepreneurship. He holds a degree in Architecture from the Rivers State University of Science and Technology. Throughout his career, he&apos;s served in key roles, including Commissioner of Youth, Conflict Resolution and Employment Generation in the Bayelsa State Government.  <br /> <br />
            He also held the position of Commissioner of Energy and Special Assistant to Nigeria&apos;s first Energy Minister and President/Secretary General of OPEC, King Dr. Edmond Daukoru (CON). Maxwell Oko&apos;s extensive experience extends to his role as the Executive Vice Chairman of Eraskorp Nigeria Limited, a diverse indigenous conglomerate with interests spanning power, oil and gas, security, agribusiness, infrastructure, and real estate.</p>
          </div>    
        </div>
      </div>
      <div key={2} className="flex flex-col gap-10 pt-12 md:gap-16">
        <div className="flex flex-col items-center gap-4 lg:gap-12 lg:flex-row">
          <div className='flex flex-col gap-4 items-center justify-center text-center lg:text-left lg:items-start flex-[1_1_0%]'>
            <Image width={100} height={100} alt='' src={VisionImg} className="object-cover mx-auto rounded-full h-44 w-44 md:w-48 md:h-48 md:rounded-none md:mx-0 bg-black/10" />
            <div>
              <h4 className="text-xl font-bold">{'Maxwell Oko'}</h4>
              <span className="text-sm font-extrabold text-primary">{'Chairman'}</span>
            </div>
          </div> 
          <div className='text-[#6D6D6D] font-argentinum text-sm md:text-base md:text-left flex-[3_1_0%]'>
          <p className='text-sm md:text-base'>Maxwell Oko&apos;s journey encompasses architecture, public service, and entrepreneurship. He holds a degree in Architecture from the Rivers State University of Science and Technology. Throughout his career, he&apos;s served in key roles, including Commissioner of Youth, Conflict Resolution and Employment Generation in the Bayelsa State Government.  <br /> <br />
            He also held the position of Commissioner of Energy and Special Assistant to Nigeria&apos;s first Energy Minister and President/Secretary General of OPEC, King Dr. Edmond Daukoru (CON). Maxwell Oko&apos;s extensive experience extends to his role as the Executive Vice Chairman of Eraskorp Nigeria Limited, a diverse indigenous conglomerate with interests spanning power, oil and gas, security, agribusiness, infrastructure, and real estate.</p>
          </div>    
        </div>
      </div>
    </Carousel>
   
  </section>
  )
}

export default People