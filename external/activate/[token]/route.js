import { checkVerifyEmail, setVerifyEmail } from '@/app/sakoku/external/user'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request, { params }) {
    const { token } = params
    try {
        let emailVerify = await checkVerifyEmail(token)
        if (emailVerify) {
            await setVerifyEmail(token)
        }
        return NextResponse.json({ message: 'Email verified successfully' }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: 'Error verifying email' }, { status: 500 })
    }
}
