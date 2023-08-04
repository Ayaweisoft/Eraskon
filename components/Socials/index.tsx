import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { MdContentCopy } from 'react-icons/md'
import { AiOutlineClose, AiOutlineWhatsApp, AiOutlineLinkedin, AiOutlineYoutube } from 'react-icons/ai'

const Socials = () => {
    const [link, setLink]  = React.useState(`https://www.discoverpathway.com/claim/$text=Claim%20Your%20Name&via=dev_Nickj&id=`)
    
  return (
          <div className='flex flex-col md:flex-row justify-center gap-4 rounded-md text-white'>
            <a target='_blank' className='flex gap-3 items-center p-2 px-3 border rounded-lg' href={`http://www.twitter.com/bbscholarships`}>
                <FaTwitter className='text-base' />
                Twitter

            </a>
            <a target='_blank' className='flex gap-3 items-center p-2 px-3 border rounded-lg' href={`http://www.instagram.com/bbscholarships`}>
                <FaInstagram className='text-base' />
                Instagram
            </a>
            <a target='_blank' className='flex gap-3 items-center p-2 px-3 border rounded-lg' href={`http://www.youtube.com/@bbscholarships`}>
                <FaYoutube className='text-base' />
                Youtube
            </a>
            <a target='_blank' className='flex gap-3 items-center p-2 px-3 border rounded-lg relative' href={`https://www.facebook.com/profile.php?id=100093557540407&mibextid=ZbWKwL`}>
              <FaFacebookF className='text-base' />
                Facebook
            </a>
            <a target='_blank' className='flex gap-3 items-center p-2 px-3 border rounded-lg' href={`https://wa.link/brilliantbrainscholarships`}>
                <AiOutlineWhatsApp className='text-lg' />
                Whatsapp
            </a>
            {/* <a target='_blank' className='flex gap-3 items-center p-2 px-3 border rounded-lg' href={`https://telegram.me/share/url?url=${link}&text=Claim%20Your%20Name`}>
                <FaTelegramPlane className='text-base' />
                Telegram
            </a> */}
          </div>
          
  )
}

export default Socials