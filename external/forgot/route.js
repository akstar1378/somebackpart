import { resetPassword } from '@/app/sakoku/external/user'
import { userLoginSchema } from '@/app/sakoku/validation/user-validation'
import { NextResponse } from 'next/server'

export async function POST(req) {
    const { password, token } = await req.json()
    try {
        let parsedResetData = await userLoginSchema.validate(
            {
                password: password
            },
            { strict: true }
        )
        parsedResetData = userLoginSchema.cast(parsedResetData)
        await resetPassword(parsedResetData, token)
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
