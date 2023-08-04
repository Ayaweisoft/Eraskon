import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnection';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import nodemailer from 'nodemailer';

// ----------------------------------------------------------------------

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    const session = await getServerSession(req, res, authOptions)
    // console.log({session})

    if (!session) {
      return res.status(401).json({ message: "You must be signed in to access this" });
    } 

    if (req.method != 'POST') {
        return res.status(400).json({ message: 'Request method not allowed' });
    }
    else {
        const { sender, recipient, subject, message } = req.body;
        console.log({sender, recipient, subject, message})

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'nicholasduadei14@gmail.com',
              pass: 'qbltztxonnsivedv'
            }
          });

          const mailOptions = {
            // from: sender,
            to: recipient,
            subject,
            text: message,
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
                <title>Reply</title>
            </head>
            <body style="background-color: #F5F5F5; font-family: 'Montserrat', sans-serif;">
                <main style="background-color: white; color: #1C1C1C; max-width: 507px; margin-inline: auto; ">
                    <div style="padding: 24px; padding-top: 24px;">
                        <p style="font-size: 14px; max-width: 410px; line-height: 25px; letter-spacing: 0.02em; font-weight: 500; opacity: 0.95;">
                            ${message}
                        </p>
                        <div style="margin-top: 42px; font-weight: 500; opacity: 0.97; margin-bottom: 42px; font-size: 14px;">
                            <p>Best Regards,</p>
                            <p>The Eraskon Team</p>
                        </div>
                        <p style="height: 1px; background-color: #00000025;"></p>
                        <div>
                            <p style="font-size: 12px; margin-top: 30px; margin-bottom: 30px; color: #444444; max-width: 410px; line-height: 25px; letter-spacing: 0.02em;">
                                Talk to us anytime! Call +2347001020300 or email info@bbscholarship.org © 2023 Eraskon, Inc. All rights reserved.
                            </p>
                        </div>
                    </div>
                </main>
            </body>
            </html>
            `
          };

          // Send the email
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log('Error occurred:', error.message);
                    res.status(500).send({ error: 'An error occurred while sending the email' });
                } else {
                    console.log('Email sent successfully!');
                    res.status(200).send({ message: 'Email sent successfully' });
                }
            });   
    }

  } catch (error: any) {
    console.error(error);
    res.status(error?.status || 500).json({ message: error?.message || 'Internal server error' });
  }
}

{/* <div style="display: flex; justify-content: center;">
<img style="height: 70px; width:70px; margin-inline: auto;" src="https://firebasestorage.googleapis.com/v0/b/brilliant-brains-7e04f.appspot.com/o/images%2F32398123-bbd8-4001-8229-70549645f864?alt=media&token=1a988122-b54d-44e3-82b5-915b6f459925" alt="">
</div> */}