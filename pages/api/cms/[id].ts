import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnection';
import Cms from '@/models/CmsModel';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"



// ----------------------------------------------------------------------

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    const session = await getServerSession(req, res, authOptions)
    console.log({session, 'session.user': session?.user})

    if (!session) {
      return res.status(401).json({ message: "You must be signed in to access this" });
    } 

    if (req.method !== 'DELETE' && req.method !== 'GET' && req.method !== 'PATCH') {
      return res.status(400).json({ message: 'Request Method Not allowed' })
    }

    if (req.method === 'DELETE') {
        const { id } = req.query;
    //   console.log('id', id)
      if (!id) return res.status(400).json({ message: 'ID is required' })
      const cms = await Cms.findByIdAndDelete(id).lean();
      
      // console.log({ cms })
     return res.status(200).json(cms);
    }
    else if (req.method === 'GET') {
        const { id } = req.query;
    //   console.log('id', id)
      if (!id) return res.status(400).json({ message: 'ID is required' })
      const cms = await Cms.findById(id).lean();

      if (!cms) throw new Error('An error occured')
      // console.log({ cms })
     return res.status(200).json(cms);
    }
    else if (req.method === 'PATCH') {
        const { id } = req.query;
    //   console.log('id', id)
      if (!id) return res.status(400).json({ message: 'ID is required' })
      console.log({body: req.body})
      
      const cms = await Cms.findByIdAndUpdate(id, req.body, { new: true }).lean();

      if (!cms) throw new Error('An error occured')
      // console.log({ cms })
     return res.status(200).json(cms);
    }


  } catch (error: any) {
    console.error(error);
    return res.status(error?.status || 500).json({ message: error?.message || 'Internal server error' });
  }
}