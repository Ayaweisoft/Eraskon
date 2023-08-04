import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnection';
import User from '@/models/UserModel';

// ----------------------------------------------------------------------

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') {
        res.status(400).json({ message: 'Only POST requests allowed' });
        return;
    }

    try {
        await dbConnect();
        // console.log('kllsa')
        if (!req.body.password || (!req.body.email && !req.body.username)) {
            res.status(400).json({ message: 'Please fill in all fields' });
            return;
        }

        console.log('name: ', req.body.email, req.body.username)

        const user = await User.findOne({
            $or: [
                { email: req.body.email ? req.body.email : '' },
                { username: req.body.username ? req.body.username : '' }
            ]
        });

        if (!user) {
            res.status(400).json({ message: 'User not founds' });
            return;
        }
        const isMatch = await user.comparePassword(req.body.password);

        if (!isMatch) {
            // console.log({isMatch, user})
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}