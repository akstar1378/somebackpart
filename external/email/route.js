import { generateEmailToken } from '@/app/sakoku/external/email'
import { NextResponse } from 'next/server'

export async function POST(req) {
    const { email } = await req.json()
    let userId = req.nextUrl.searchParams.get('id')
    try {
        let sendEmailStatus = await generateEmailToken(email, userId)
        if (sendEmailStatus) {
            return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({ message: 'Error sending email' }, { status: 500 })
    }
}
