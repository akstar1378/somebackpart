import { registerUser } from '@/app/sakoku/external/user'
import { userSchema } from '@/app/sakoku/validation/user-validation'
import { NextResponse } from 'next/server'

export async function POST(req) {
    const { username, password, lastName, firstName, email, emailVerify, isFree } = await req.json()
    try {
        let parsedRegisterData = await userSchema.validate(
            {
                username: username,
                password: password,
                email: email,
                lastName: lastName,
                firstName: firstName
            },
            { strict: true }
        )
        parsedRegisterData = userSchema.cast(parsedRegisterData)
        console.log(parsedRegisterData)
        await registerUs(parsedRegisterData, emailVerify, isFree)
        return NextResponse.json({ message: 'user registered successfully' }, { success: true })
    } catch (error) {
        if (error.name === 'ValidationError') {
            return NextResponse.json({ error: 'validation-error', fields: error.errors }, { status: 400 })
        }
        return NextResponse.json({ error: 'error' }, { status: 500 })
    }
}
