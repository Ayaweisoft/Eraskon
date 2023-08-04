import React from 'react'
import { MdChevronLeft, MdArrowRight } from 'react-icons/md'
import Link from 'next/link'
import Image from 'next/image'
import Button from '../Button'

const ScholarshipCard = ({ scholarship }: { scholarship: any }) => {
  const [show, setShow] = React.useState(false)
  
  return (
    <div>
      <div className='flex flex-col shadow'>
        {/* <Image className='object-cover object-center h-32 w-full bg-' src={scholarship.image} height={128} width={128} alt="" /> */}
        <div className="flex flex-col p-4">
          <div className="flex flex-col h-16 overflow-hidden mb-3">
            <h2 className="text-base font-medium max-h-[70px] overflow-hidden">
              {scholarship?.name}
            </h2>
            <div className="flex w-full justify-start gap-1 text-xs text-[#98A2B3] items-center">
              category
              <MdArrowRight />
              <span>{scholarship?.category}</span>
            </div>
          </div>
          <div>
            {!show ?
              <span onClick={() => setShow(true)} className="text-sm h-24 overflow-hidden cursor-pointer underline">
                View Requirements
              </span>
              :
              <p className="text-left h-24 overflow-hidden text-sm">
                {scholarship?.requirements}
              </p>
            }

          </div>
          <div className="flex gap-2 justify-start items-center mt-7 text-sm">
            <Link  href={`https://box.reinsys.net/brilliant/`} className="grad-to-right text-white p-2 px-4 hover:shadow-lg rounded" >Enroll Here</Link>
          </div>
        </div>
      </div>
  </div>
  )
}

export default ScholarshipCard