import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Load environment variables (Set these in .env.local)
const EMAIL_HOST = process.env.HOST!
const EMAIL_PORT = process.env.EMAIL_PORT!
const EMAIL_USER = process.env.EMAIL_USER!
const EMAIL_PASS = process.env.EMAIL_PASSWORD!
const EMAIL_TO = 'bdiri.amine08@gmail.com'

export async function POST(req: NextRequest) {
  try {
    const { firstName, email, mobile, company, message } = await req.json()
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT),
      secure: false,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: `"${firstName}" <${EMAIL_USER}>`,
      to: EMAIL_TO,
      subject: 'New Contact Message',
      html: `
        <h2>New Contact Message</h2>
        <p>Hello ${firstName},</p>
        <p>You have received a new message from ${firstName} - ${email}.</p>
        <p><strong>Name:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>📞 Mobile:</strong> ${mobile}</p>
        <p><strong> 🏢 Company:</strong> ${company || 'Not provided'}</p>
      
        <p><strong>✉️ Message:</strong></p>
        <p>${message}</p>
        Best regards,  
        The Expert-Metal Team.
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
