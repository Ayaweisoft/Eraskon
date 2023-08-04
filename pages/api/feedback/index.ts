import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnection';
import Feedback from '@/models/FeedbackModel';
import { IFeedback } from '@/interfaces';

// ----------------------------------------------------------------------

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    if (req.method === 'GET') {
      const candidates = await Feedback.find({}).sort('-createdAt').lean();
      return res.status(200).json(candidates);
    }
    else {

      if (req.method !== 'POST') {
        return res.status(400).json({ message: 'Request Method Not allowed' })
      }

      if (!req.body.email || !req.body.name || !req.body.number || !req.body.type || !req.body.productId) {
        return res.status(400).json({ message: 'Fill all required fields' })
      }
      
      const data: IFeedback = {
        productId: req.body.productId,
        email: req.body.email,
        name: req.body.name,
        number: req.body.number,
        info: req.body.info,
        type: req.body.type
    }

      const feedback = await Feedback.create(data);

      if (!feedback) throw new Error('Post Failed')

      // console.log('feedback', feedback)
      return res.status(200).json(feedback);
    }
  } catch (error: any) {
    console.error(error);
    return res.status(error?.status || 500).json({ message: error?.message || 'Internal server error' });
  }
}