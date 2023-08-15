import Head from "next/head";
import { FormEvent, useEffect, useReducer, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from "@/components/Button";
import Image from "next/image";
import { BiCircle } from 'react-icons/bi'
import Link from "next/link";
import { ICms, INews, IReducerAction } from '@/interfaces'
import { IProduct } from "@/interfaces";
import Product from "@/components/ProductCard";
import dbConnect from '@/lib/dbConnection';
import CmsModel from '@/models/CmsModel';
import ProductModel from '@/models/ProductModel';
import { useRouter } from "next/router";
import WeAreImg from "@/assets/weare.png"
import WeDoImg from "@/assets/wedo.png"
import ValueImg from "@/assets/values.png"
import MissionImg from "@/assets/mission.png"
import VisionImg from "@/assets/vision.png"
import Hero from "@/components/Hero";


export default function Home({ cms, products }: { cms: ICms, products: IProduct[] }) {
  const router = useRouter()

  const handleClick = (id: any) => {
    router.push(`/products/${id}`)
  }

  console.log({cms, products })

  return (
    <div>
      <Head>
        <title>Eraskon</title>
        <meta name="description" content="Eraskon Nigeria Limited (ENL) is an indigenous Security and Logistics services provider in the Oil & Gas and Marine sectors of the Nigerian economy" />
        <link rel="icon" href="/faviconimg.png" />
      </Head>
      <div className="">
        {/* {loading && <Loader modalOpen={true} />} */}
        <Header />
        <Hero />
        {/* <section className="section relative top-section h-[80vh] pb-12 overflow-hidden flex justify-center items-center lg:min-h-screen bg-blue lg:mt-0 lg:pt-40">
          <svg className="absolute inset-0 h-screen" viewBox='0 0 1600 800'><rect fill='#090F3B' width='1600' height='800' /><g fillOpacity='1'><path fill='#0a1040' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z' /><path fill='#0b1145' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z' /><path fill='#0b134b' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z' /><path fill='#0c1450' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z' /><path fill='#0D1555' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z' /><path fill='#0e165b' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z' /><path fill='#0f1860' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z' /><path fill='#0f1966' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z' /><path fill='#101b6b' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z' /><path fill='#111C71' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z' /></g></svg>
          <svg className="absolute inset-0 h-screen opacity-20" xmlns="http://www.w3.org/2000/svg" version="1.1" width="1440" height="560" preserveAspectRatio="none" viewBox="0 0 1440 560">
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
          <div className="absolute z-10 flex w-4/5 gap-4 -translate-x-1/2 -translate-y-1/2 h-4/5 top-1/2 left-1/2">
            <div className="flex w-full">
              <img src={cms?.whoWeAre?.image} alt="" className="relative object-cover w-full h-full opacity-10" />
            </div>
            <div className="flex w-full">
              <img src={cms?.whatWeDo?.image} alt="" className="relative object-cover w-full h-full opacity-10" />
            </div>
            <div className="flex w-full">
              <img src={cms?.whoWeAre?.image} alt="" className="relative object-cover w-full h-full opacity-10" />
            </div>
          </div>
          <div className="z-20 flex flex-col items-center justify-center order-2 gap-4 lg:order-1">
            <h1 className="mb-3 text-4xl font-extrabold text-white capitalize md:text-6xl">{cms?.hero?.header || "Think Solution"}</h1>
            <p className="w-3/5 text-gray-400 md:text-lg">{cms?.hero?.text || "We provide solutions and services in the Power, Oil and Gas, Security, Agribusiness, Infrastructral Development and Real Estate Sectors."}</p>
            <Button onClick={() => router.push(`/products`)} className={`py-2 pb-2.5 px-6 text-lg text-blue font-semibold bg-gold rounded-full`}>
              Learn More
            </Button>
          </div>
        </section> */}
        <section className="relative flex flex-col gap-3 pt-16 pb-20 overflow-hidden section md:pt-28">
          <svg className="absolute top-0 left-0 min-w-full rotate-180 opacity-20" xmlns="http://www.w3.org/2000/svg" version="1.1" width="1440" height="250" preserveAspectRatio="none" viewBox="0 0 1440 250"><g mask="url(&quot;#SvgjsMask1063&quot;)" fill="none"><path d="M20 250L270 0L567 0L317 250z" fill="url(&quot;#SvgjsLinearGradient1064&quot;)"></path><path d="M258.6 250L508.6 0L759.1 0L509.1 250z" fill="url(&quot;#SvgjsLinearGradient1064&quot;)"></path><path d="M518.2 250L768.2 0L1120.7 0L870.7 250z" fill="url(&quot;#SvgjsLinearGradient1064&quot;)"></path><path d="M754.8000000000001 250L1004.8000000000001 0L1330.3000000000002 0L1080.3000000000002 250z" fill="url(&quot;#SvgjsLinearGradient1064&quot;)"></path><path d="M1421 250L1171 0L941.5 0L1191.5 250z" fill="url(&quot;#SvgjsLinearGradient1065&quot;)"></path><path d="M1190.4 250L940.4000000000001 0L896.9000000000001 0L1146.9 250z" fill="url(&quot;#SvgjsLinearGradient1065&quot;)"></path><path d="M942.8 250L692.8 0L497.79999999999995 0L747.8 250z" fill="url(&quot;#SvgjsLinearGradient1065&quot;)"></path><path d="M697.1999999999999 250L447.19999999999993 0L178.69999999999993 0L428.69999999999993 250z" fill="url(&quot;#SvgjsLinearGradient1065&quot;)"></path><path d="M1220.697497010788 250L1440 30.697497010788L1440 250z" fill="url(&quot;#SvgjsLinearGradient1064&quot;)"></path><path d="M0 250L219.302502989212 250L 0 30.697497010788z" fill="url(&quot;#SvgjsLinearGradient1065&quot;)"></path></g><defs><mask id="SvgjsMask1063"><rect width="1440" height="250" fill="#ffffff"></rect></mask><linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="SvgjsLinearGradient1064"><stop stopColor="rgba(9, 15, 59, 1)" offset="0"></stop><stop stopOpacity="0" stopColor="rgba(9, 15, 59, 1)" offset="0.66"></stop></linearGradient><linearGradient x1="100%" y1="100%" x2="0%" y2="0%" id="SvgjsLinearGradient1065"><stop stopColor="rgba(9, 15, 59, 1)" offset="0"></stop><stop stopOpacity="0" stopColor="rgba(9, 15, 59, 1)" offset="0.66"></stop></linearGradient></defs></svg>
          <h2 className="mb-4 text-3xl font-extrabold text-center text-blue md:text-5xl md:mb-12">About Us</h2>
          <div className="flex flex-col gap-6 md:gap-10 md:gap-12">
            <div className="flex flex-col justify-center gap-4 h-fit lg:flex-row md:gap-12">
              <div className="flex flex-col flex-1 gap-4 overflow-hidden max-h-[400px] ">
                <Image src={cms?.whoWeAre?.image || WeAreImg} width={100} height={100} alt="image" className="object-cover w-full h-full" />
              </div>
              <div className="flex flex-col items-center justify-center flex-1 gap-4 lg:items-start w-fit">
                <h2 className="mb-3 text-2xl font-extrabold md:text-3xl w-fit text-blue">Who We Are</h2>
                <p className="mb-4 text-center md:text-lg lg:text-left">{cms?.whoWeAre?.text || "Eraskon Nigeria Limited is a Nigerian integrated lubricants, chemicals, plastics and packaging company. We are a subsidiary of Eraskorp Nigeria Limited, an energy and infrastructure conglomerate established in July of 2004. We restructured and secured investment from the Nigerian Content Development and Monitoring Board (NCDMB) to support our ambition of becoming a petroleum lubricants manufacturer."}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="relative flex flex-col gap-3 pt-16 pb-20 overflow-hidden text-white section md:pt-28 grad-to-right">
        <div className="flex flex-col justify-center gap-4 lg:flex-row md:gap-12">
              <div className="flex flex-col flex-1 gap-4 overflow-hidden max-h-[400px] lg:order-2 ">
                <Image src={cms?.whatWeDo?.image || WeDoImg} width={100} height={100} alt="image" className="object-cover w-full h-full" />
              </div>
              <div className="flex flex-col items-end justify-center flex-1 gap-4 lg:items-end w-fit">
                <h2 className="w-full mb-3 text-2xl font-extrabold text-center capitalize md:text-3xl lg:text-right text-]">What We Do</h2>
                <p className="mb-4 text-center md:text-lg lg:text-right">{cms?.whatWeDo?.text || "Eraskon offers three core services namely; 1. Lubricants-high quality lubricating oils and speciality products such as waxes 2. Chemicals-engine coolants, aerosols, production chemicals and bio-degradable products. 3. Plastics & packaging-plastic containers for engine oils, homecare products, and packaging of finished lubricants."}</p>
              </div>
            </div>
        </section>
        <section className="py-12 text-center section md:py-20">
          <div className="flex flex-col items-center max-w-2xl gap-4 mx-auto mb-12">
            {/* <h2 className="text-2xl font-bold text-primary">Our Programmes</h2> */}
            <h3 className="mb-3 text-3xl font-extrabold capitalize md:text-5xl">
              Our Products
            </h3>
            <p className="text-lg text-gray-500">
              At Eraskon Nigeria Limited, we take pride in delivering high-quality products that meet the demands of various industries
              {/* Elevating Industry Excellence Through Quality, Integrity, and Collaboration */}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {
              products?.length > 0 ? (
                products?.map((item: IProduct, index: number) => (
                  <Product key={index} product={item} handleClick={handleClick} mode="user" />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center gap-4">
                  <h1 className="text-2xl font-argentinum">No Products</h1>
                </div>
              )
            }
          </div>
          {/* <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {
              products?.length > 0 ? (
                products?.map((item: IProduct, index: number) => (
                  <Product key={index} product={item} handleClick={handleClick} mode="user" />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center gap-4">
                  <h1 className="text-2xl font-argentinum">No Products</h1>
                </div>
              )
            }
          </div> */}
        </section>
        <section className="py-12 text-center text-white section md:py-20 grad-to-right">
          <div className="flex flex-col items-center max-w-2xl gap-4 mx-auto mb-12">
            <h3 className="mb-3 text-3xl font-extrabold capitalize md:text-5xl">
              Our Core Principles: Quality, Vision, Unity
            </h3>
            <p className="text-lg text-white/90">
              We are committed to providing quality services to our clients, we are visionaries and we are united in our quest to provide the best services to our clients.
              {/* Elevating Industry Excellence Through Quality, Integrity, and Collaboration */}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center ustify-center flex-1 gap-4 min-w-[300px] max-w-md">
              <Image src={MissionImg} alt="image" className="object-cover w-24 h-24" />
              <h3 className="text-2xl font-bld text-lue">Mission</h3>
              <p className="text-white/80 text-g">At Eraskon Nigeria Limited, we&lsquo;re committed to delivering top-quality industrial solutions while upholding safety and excellence. Our mission is to enhance operational efficiency for our clients, contribute positively to the industries we serve, and drive sustainable growth in Nigeria and sub-Saharan Afric</p>
            </div>
            <div className="flex flex-col items-center ustify-center flex-1 gap-4 min-w-[300px] max-w-md">
              <Image src={VisionImg} alt="image" className="object-cover w-24 h-24" />
              <h3 className="text-2xl font-bld text-lue">Vision</h3>
              <p className="text-white/80 text-g">Our vision is to become a leading provider of innovative energy and industrial solutions in Nigeria and sub-Saharan Africa, driving progress across multiple sectors. We aspire to be a catalyst for economic growth, guided by excellence, integrity, and partnership.</p>
            </div>
            <div className="flex flex-col items-center ustify-center flex-1 gap-4 min-w-[300px] max-w-md">
              <Image src={ValueImg} alt="image" className="object-cover w-24 h-24" />
              <h3 className="text-2xl font-bld text-lue">Values</h3>
              <p className="text-white/80 text-g">Our core values are the bedrock of Eraskon Nigeria Limited. We embody these principles in every facet of our operations, fostering a culture of excellence, integrity, and collaboration</p>
            </div>
          </div>
        </section>
        <section className="py-12 text-center section md:py-20">
          <div className="flex flex-col items-center max-w-2xl gap-4 mx-auto mb-12">
            {/* <h2 className="text-2xl font-bold text-primary">Our Programmes</h2> */}
            <h3 className="mb-3 text-3xl font-extrabold capitalize md:text-5xl">
             Why Choose Eraskon?
            </h3>
            <p className="text-lg text-gray-500">
              Discover the unique benefits of partnering with Eraskon Nigeria Limited
            </p>
          </div>
          <div className="grid items-start gap-8 text-left md:grid-cols-2">
            <div className="flex flex-col items-start gap-2">
              <h4 className="text-2xl font-bold text-primary">
                Quality Assurance
              </h4>
              <p className="text-gray-500">
                Our unwavering commitment to excellence ensures that you receive the highest quality products that meet or exceed industry standards. Count on Eraskon for consistent, top-notch solutions
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <h4 className="text-2xl font-bold text-primary">
                Safety First
              </h4>
              <p className="text-gray-500">
              We prioritize the safety of your operations and the environment. Our products undergo rigorous testing to ensure they meet safety requirements, allowing you to focus on your core business with peace of mind.
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <h4 className="text-2xl font-bold text-primary">
                Custom Solutions
              </h4>
              <p className="text-gray-500">
              We understand that every business is unique. That&apos;s why we offer customized solutions to address your specific needs, providing tailored products and services that perfectly align with your goals.
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <h4 className="text-2xl font-bold text-primary">
                Industry Expertise
              </h4>
              <p className="text-gray-500">
                With years of experience in the energy and industrial sectors, our team brings extensive knowledge and expertise to the table. We understand the challenges you face and are here to support your success
              </p>
            </div>
          </div>
        </section>

        {/* <Advisory advisory={advisory} /> */}
        <Footer />
      </div>
    </div>
  );
}


export const getServerSideProps = async () => {
  let cms = {}
  let products = []
  try {
    await dbConnect()
    const res = await CmsModel.findOne({}).lean();
    cms = JSON.parse(JSON.stringify(res))

    const response = await ProductModel.find({}).lean();
    products = JSON.parse(JSON.stringify(response))

    // console.log({news_res})
    // news = JSON.parse(JSON.stringify(news_res))

  } catch (error) {
    console.log(error)
    return {
      props: {
        cms: {},
        products: [],
        status: 'failed'
      }
    }
  }


  return {
    props: {
      cms,
      products,
      status: 'success'
    }
  }
}