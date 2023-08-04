import React, { useState } from 'react';
import usePost from '../../hooks/usePost';
import { toast } from 'react-toastify';
import Button from '../Button';
import { IFeedback } from "@/interfaces"
import Loader from '../Loader';
import { useRouter } from 'next/router';


interface IProps {
  data: IFeedback | null
}

const EmailForm = ({data: info}: IProps) => {
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  
  const router = useRouter()

  const { loading, error, data, post } = usePost({ 
    api: "/mailer",
    onSuccess: () => {
        toast('Email sent successfully')
        setMessage('')
        router.push('/admin/feedbacks')
    } 
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await post({
        sender,
        recipient: info?.email,
        subject: 'Feedback from Eraskon',
        message
      });
      
    } catch (error) {
      setStatus('An error occurred while sending the email');
    }
  };

  return (
    <div>
      {loading && <Loader modalOpen={true} />}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* <input type="email" placeholder="Sender" value={sender} onChange={(e) => setSender(e.target.value)} /> */}
        <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-black/70">Recipient:</label>
          <input readOnly type="email"  className="border border-black/20 rounded-md p-2" placeholder="" value={info?.email} onChange={(e) => setRecipient(e.target.value)} />
        </div>
        {/* <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-black/70">Subject:</label>
            <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div> */}
        <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-black/70">Message:</label>
         <textarea className="border border-black/20 rounded-md p-2" rows={4} placeholder="" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
        </div>
        <Button type='submit' className="text-white px-4 sm:px-6 py-2 rounded-md text-sm">Send Mail</Button>
      </form>
    </div>
  );
};


export default EmailForm;