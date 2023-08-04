import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnection';
import Feedback from '@/models/FeedbackModel';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"


// ----------------------------------------------------------------------

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();
    
    const session = await getServerSession(req, res, authOptions)
    // console.log({session})

    if (!session) {
      return res.status(401).json({ message: "You must be signed in to access this" });
    } 



    if (req.method !== 'DELETE' && req.method !== 'GET') {
      return res.status(400).json({ message: 'Request Method Not allowed' })
    }

    if (req.method === 'DELETE') {
        
        const { id } = req.query;
    //   console.log('id', id)
      if (!id) return res.status(400).json({ message: 'ID is required' })
      const feedback = await Feedback.findByIdAndDelete(id).lean();
      // console.log({ feedback })
      return res.status(200).json(feedback);
    } else if (req.method === 'GET') {
        const { id } = req.query;
        // console.log('id', id)
        if (!id) return res.status(400).json({ message: 'ID is required' })
        const feedback = await Feedback.findById(id).lean();
        // console.log({ feedback })
        if (!feedback) return res.status(400).json({ message: 'Feedback not found' })
        return res.status(200).json(feedback);
    }
  } catch (error: any) {
    console.error(error);
    return res.status(error?.status || 500).json({ message: error?.message || 'Internal server error' });
  }
}