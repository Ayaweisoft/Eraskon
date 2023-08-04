import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnection';
import Product from '@/models/ProductModel';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

// ----------------------------------------------------------------------

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    const session = await getServerSession(req, res, authOptions)
    // console.log({session})

    const { id } = req.query;
    if (!id) return res.status(400).json({ message: 'ID is required' })
    
    if (req.method !== 'DELETE' && req.method !== 'GET' && req.method !== 'PATCH') {
      return res.status(400).json({ message: 'Request Method Not allowed' })
    }
    if (req.method === 'GET') {
      const product = await Product.findById(id).lean();
      return res.status(200).json(product);
    }

    if (!session) {
      return res.status(401).json({ message: "You must be signed in to access this" });
    } 


    if (req.method === 'DELETE') {
        
      const product = await Product.findByIdAndDelete(id).lean();
      console.log({ product })
     return res.status(200).json(product);
    }
    else if (req.method === 'PATCH') {
      const product = await Product.findByIdAndUpdate(id, req.body, { new: true }).lean();
      
      if (!product) return res.status(400).json({ message: 'update failed' })

      // console.log({ Product })
      return res.status(200).json(product);
    }

  } catch (error: any) {
    console.error(error);
    return res.status(error?.status || 500).json({ message: error?.message || 'Internal server error' });
  }
}