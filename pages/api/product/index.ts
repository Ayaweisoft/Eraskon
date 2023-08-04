import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnection';
import Product from '@/models/ProductModel';
import { IProduct } from '@/interfaces';
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


    if (req.method === 'GET') {
      const product = await Product.find({}).lean();
      res.status(200).json(product);
    }
    else {
      if (req.method !== 'POST') {
        return res.status(400).json({ message: 'Request Method Not allowed' })
      }

      // if (!req.body.email || !req.body.name || !req.body.title || !req.body.image || !req.body.number || !req.body.description) {
      //   return res.status(400).json({ message: 'Fill all required fields' })
      // }

      const data: IProduct = {
        image: req.body?.image,
        name: req.body?.name,
        description: req.body?.description,
        performantFeature: req.body?.performantFeature,
        testResults: req.body?.testResults,
        testResultsImage: req.body?.testResultsImage,
        storage: req.body?.storage,
        sizes: req.body?.sizes,
      }

      const product = await Product.create(data);

      if (!product) throw new Error('Post Failed')

      // console.log('product', product)
      return res.status(200).json(product);
    }
  } catch (error: any) {
    console.error(error);
    return res.status(error?.status || 500).json({ message: error?.message || 'Internal server error' });
  }
}