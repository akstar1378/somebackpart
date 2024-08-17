import { checkResetPasswordToken } from '@/app/sakoku/external/user'
import moment from 'moment/moment'
import { NextResponse } from 'next/server'

export async function GET({ params }, req) {
    const { token } = params
    try {
        let checkResetPassword = await checkResetPasswordToken(token)
        if (checkResetPasswordToken) {
            return NextResponse.json({ message: 'Token is valid' }, { status: 200 })
        }
        let checkPasswordTokenDate = moment(checkResetPassword[0].forgotPassword.createdAt, YYYYMMDD).fromNow()
        if (parseFloat(checkPasswordTokenDate) > 1) {
            return NextResponse.json({ message: 'Token is expired' }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
