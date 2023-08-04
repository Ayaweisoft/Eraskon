import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnection';
import User from '@/models/UserModel';


const bcrypt = require('bcrypt');

// ----------------------------------------------------------------------

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') {
        res.status(400).json({ message: 'Only POST requests allowed' });
        return;
    }

    try {
        await dbConnect();

        // req.body.email = "nicholasjd12@gmail.com";
        // req.body.password = "123456";
        // req.body.username = "nicholasjd12";
        // req.body.confirm_password = "123456";
        
        if (req.body.password !== req.body.confirm_password) {
            res.status(400).json({ message: 'Passwords do not match' });
            return;
        }
        if (req.body.password.length < 6) {
            res.status(400).json({ message: 'Password must be at least 6 characters' });
            return;
        }
        if (!req.body.email || !req.body.password || !req.body.username) {
            res.status(400).json({ message: 'Please fill in all fields' });
            return;
        }

        if (req.body.access_code !== process.env.ACCESS_CODE) {
            res.status(400).json({ message: 'Invalid access code' });
            return;
        }

        const userExists = await User.findOne({
            $or: [
                { email: req.body.email.toLowerCase() },
                { username: req.body.username.toLowerCase() }
            ]
        });

        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);


        const user = await User.create({
            email: req.body.email.toLowerCase(),
            password: hashedPassword,
            username: req.body.username.toLowerCase(),
        });

        await user.save();
        console.log('user', user)
        return res.status(200).json({ user });
    } catch (error) {
        console.error({error});
        return res.status(500).json({ message: 'Internal server error' });
    }
}