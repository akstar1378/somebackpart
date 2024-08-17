import { NextResponse } from 'next/server'

import { postUser } from '@/app/sakoku/user'

import { userSchema } from '@/app/sakoku/validation/user-validation'

export async function POST(req) {
    const { username, password, lastName, firstName, email, type } = await req.json()
    try {
        let parsedUser = await userSchema.validate(
            {
                username,
                type,
                password,
                lastName,
                firstName,
                email
            },
            { strict: true }
        )
        parsedUser = userSchema.cast(parsedUser)
        await postUser(parsedUser)
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        if (error.name === 'ValidationError')
            return NextResponse.json({ error: 'validation-error', fields: error.errors }, { status: 400 })
        return NextResponse.json({ error: 'error' }, { status: 500 })
    }
}
