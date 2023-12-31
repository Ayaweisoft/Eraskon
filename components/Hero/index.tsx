import React, { useEffect, useState, useMemo } from 'react'
import Hero1 from '@/assets/heo.svg'
import Hero2 from '@/assets/heo.svg'
import Hero3 from '@/assets/heo.svg'
import Image from 'next/image'
import Button from '../Button'
import { useRouter } from "next/router";
import Bg2 from "@/assets/bg2.jpg"
import Bg3 from "@/assets/product.png"
import Bg4 from "@/assets/bg3.png"


  
const carouselData = [
  {
      id: 1,
      heroImg: '',
      title: 'Welcome to Eraskon Nigeria Limited',
      text: 'Your Trusted Partner for Quality Lubricants, Chemicals, and Packaging Solutions',
  },
  {
      id: 2,
      heroImg: Bg2,
      title: 'Quality Lubricants for Industry Excellence',
      text: 'Discover our high-quality lubricating oils and specialty products, ensuring the smooth operation of your machinery'
  },  
  {
      id: 3,
      heroImg: Bg3,
      title: 'Chemicals that Drive Innovation',
      text: 'Explore our range of engine coolants, aerosols, production chemicals, and bio-degradable products, designed to meet diverse industry needs.',
  },
  {
      id: 4,
      heroImg: Bg4,
      title: 'Packaging Solutions for Your Success',
      text: 'We offer plastic containers for engine oils, homecare products, and packaging solutions, delivering your finished lubricants safely and professionally.',
  },
]

const Hero = () => {
  const carouselRef = React.useRef<HTMLDivElement>(null)
  const carouselInnerRef = React.useRef<HTMLDivElement[]>([])
  const router = useRouter()

  
  const handleClick = (id: any) => {
    router.push(`/products/${id}`)
  }
  
 
  useEffect(() => {  
    // fade in and out carousel automatically
    const handleCarousel = () => {
      const carousel = carouselRef.current;
      if (!carousel) return
      const carouselItems = carouselInnerRef.current;
      if (!carouselItems) return
      
      let counter = 0
      const timer = setInterval(() => {
          // console.log("fired", counter, carouselItems.length)
          carouselItems?.forEach(item => {
              item.classList.remove('active')
          })
          carouselItems[counter].classList.add('active')
          counter++
          console.log({counter})
          if (counter > carouselItems.length - 1) {
              counter = 0
          }
      }, 5000)
      return timer
    }

    const timer = handleCarousel()

    return () => {
      clearInterval(timer)
    }

  }, [carouselRef])


  return (
    <div className='box-border relative w-full min-h-screen p-8 text-white bg-center bg-cover lg:h-screen'>
          
      {carouselData.map((item, index) => (
          <div key={index} ref={carouselRef} className="box-border absolute top-0 left-0 z-0 w-full h-full">
            <div ref={(el: HTMLDivElement) => (carouselInnerRef.current[index] = el)} className={`box-border absolute top-0 left-0 w-full h-full carousel-item ${index===0 && "active"}`}>
              <>
                {
                  !item.heroImg ?  (
                    <div className="absolute inset-0 w-full h-full bg-center bg-cover">
                      <svg className="box-border absolute inset-0 w-full h-full -0" viewBox='80 80 80 80'><rect fill='#090F3B' width='1600' height='800' /><g fillOpacity='1'><path fill='#0a1040' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z' /><path fill='#0b1145' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z' /><path fill='#0b134b' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z' /><path fill='#0c1450' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z' /><path fill='#0D1555' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z' /><path fill='#0e165b' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z' /><path fill='#0f1860' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z' /><path fill='#0f1966' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z' /><path fill='#101b6b' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z' /><path fill='#111C71' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z' /></g></svg>
                      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg" version="1.1" width="1440" height="560" preserveAspectRatio="none" viewBox="0 0 1440 560">
                        <g mask="url(&quot;#SvgjsMask1218&quot;)" fill="none">
                          <use href="#SvgjsSymbol1225" x="0" y="0"></use>
                          <use href="#SvgjsSymbol1225" x="720" y="0"></use>
                        </g>
                        <defs>
                          <mask id="SvgjsMask1218">
                            <rect width="1440" height="560" fill="#ffffff"></rect>
                          </mask>
                          <path d="M-1 0 a1 1 0 1 0 2 0 a1 1 0 1 0 -2 0z" id="SvgjsPath1222"></path>
                          <path d="M-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0z" id="SvgjsPath1220"></path>
                          <path d="M-5 0 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0z" id="SvgjsPath1221"></path>
                          <path d="M2 -2 L-2 2z" id="SvgjsPath1223"></path>
                          <path d="M6 -6 L-6 6z" id="SvgjsPath1219"></path>
                          <path d="M30 -30 L-30 30z" id="SvgjsPath1224"></path>
                        </defs>
                        <symbol id="SvgjsSymbol1225">
                          <use href="#SvgjsPath1219" x="30" y="30" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1220" x="30" y="90" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="30" y="150" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="30" y="210" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="30" y="270" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="30" y="330" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="30" y="390" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1220" x="30" y="450" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="30" y="510" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1222" x="30" y="570" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="90" y="30" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="90" y="90" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="90" y="150" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="90" y="210" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="90" y="270" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="90" y="330" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1224" x="90" y="390" stroke="rgba(255, 222, 90, 1)" strokeWidth="3"></use>
                          <use href="#SvgjsPath1220" x="90" y="450" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="90" y="510" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="90" y="570" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1220" x="150" y="30" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="150" y="90" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="150" y="150" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="150" y="210" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="150" y="270" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="150" y="330" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="150" y="390" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="150" y="450" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1224" x="150" y="510" stroke="rgba(255, 222, 90, 1)" strokeWidth="3"></use>
                          <use href="#SvgjsPath1223" x="150" y="570" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="210" y="30" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="210" y="90" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1222" x="210" y="150" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="210" y="210" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="210" y="270" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="210" y="330" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="210" y="390" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="210" y="450" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="210" y="510" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1222" x="210" y="570" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1224" x="270" y="30" stroke="rgba(255, 222, 90, 1)" strokeWidth="3"></use>
                          <use href="#SvgjsPath1219" x="270" y="90" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1224" x="270" y="150" stroke="rgba(255, 222, 90, 1)" strokeWidth="3"></use>
                          <use href="#SvgjsPath1222" x="270" y="210" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1222" x="270" y="270" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="270" y="330" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1220" x="270" y="390" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="270" y="450" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1224" x="270" y="510" stroke="rgba(255, 222, 90, 1)" strokeWidth="3"></use>
                          <use href="#SvgjsPath1219" x="270" y="570" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="330" y="30" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="330" y="90" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="330" y="150" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="330" y="210" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="330" y="270" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="330" y="330" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1222" x="330" y="390" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="330" y="450" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="330" y="510" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1220" x="330" y="570" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="390" y="30" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1220" x="390" y="90" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1224" x="390" y="150" stroke="rgba(255, 222, 90, 1)" strokeWidth="3"></use>
                          <use href="#SvgjsPath1219" x="390" y="210" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="390" y="270" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="390" y="330" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="390" y="390" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="390" y="450" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="390" y="510" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="390" y="570" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="450" y="30" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="450" y="90" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="450" y="150" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="450" y="210" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="450" y="270" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="450" y="330" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="450" y="390" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="450" y="450" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="450" y="510" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="450" y="570" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="510" y="30" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="510" y="90" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="510" y="150" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="510" y="210" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="510" y="270" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1222" x="510" y="330" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1222" x="510" y="390" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="510" y="450" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1220" x="510" y="510" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="510" y="570" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="570" y="30" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="570" y="90" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="570" y="150" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="570" y="210" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="570" y="270" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="570" y="330" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="570" y="390" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="570" y="450" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="570" y="510" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="570" y="570" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="630" y="30" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="630" y="90" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="630" y="150" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="630" y="210" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="630" y="270" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="630" y="330" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="630" y="390" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="630" y="450" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="630" y="510" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1222" x="630" y="570" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="690" y="30" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="690" y="90" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1220" x="690" y="150" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="690" y="210" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="690" y="270" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1220" x="690" y="330" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1221" x="690" y="390" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1223" x="690" y="450" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="690" y="510" stroke="rgba(255, 222, 90, 1)"></use>
                          <use href="#SvgjsPath1219" x="690" y="570" stroke="rgba(255, 222, 90, 1)"></use>
                        </symbol>
                      </svg>
                    </div>
                  ) : (
                    <div className="absolute inset-0 w-full h-full bg-center bg-cover">
                      <div className="absolute inset-0 w-full h-full bg-black opacity-50"></div>
                      <Image src={item.heroImg} alt="" className="object-cover w-full h-full" />
                    </div>
                  )
                }
              </>
              <div className="backdrop-blur-[1.5px] bg-black/60 absolute w-full h-full flex flex-col justify-center items-center text-xl md:text-3xl  box-border">
                <div className='flex flex-col items-center justify-center max-w-xl gap-4 p-8'>
                  <h1 className='mb-3 text-3xl font-extrabold text-center text-white capitalize sm:text-4xl md:text-6xl'>{item.title}</h1>
                  <p className='text-sm text-center text-gray-400 md:text-lg'>{item.text}</p>
                  <Button onClick={() => router.push(`/products`)} className={`mt-2 py-2 pb-2.5 px-6 md:text-lg text-blue font-semibold bg-gold rounded-full cursor-pointer text-sm`}>
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
      ))}
    </div>
  )
}

export default Hero