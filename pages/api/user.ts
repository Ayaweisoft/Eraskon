import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnection';
import UserModel from '@/models/UserModel';
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

// ----------------------------------------------------------------------

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();
    const session = await getServerSession(req, res, authOptions)
    // console.log({session})

    if (!session) {
      return res.status(401).json({ message: "You must be signed in to access this" });
    } 
  
    const users = UserModel;
    
    const allUsers = await users.find({}).lean();

    // console.log({allUsers})

    return res.status(200).json({ users: allUsers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}