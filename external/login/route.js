import { NextResponse } from 'next/server'

import { SignJWT } from 'jose'
import * as jose from 'jose'

import { checkUserLoginData } from '@/app/sakoku/user'
import { userLoginSchema } from '@/app/sakoku/validation/user-validation'
import { aesString } from '@/app/sakoku/encryptData'

export async function POST(req) {
    const { username, password } = await req.json()
    try {
        let parsedLoginData = await userLoginSchema.validate(
            {
                username: username,
                password: password
            },
            { strict: true }
        )
        parsedLoginData = userLoginSchema.cast(parsedLoginData)
        let userData = await checkUserLoginData(parsedLoginData)
        if (!userData) return NextResponse.json({ error: 'Invalid information' }, { status: 401 })
        delete userData.username
        delete userData.password

        // const user = { name: username }
        const encodeUsername = aesString.encrypt(username)

        let secret = new TextEncoder().encode(process.env.MY_SECRET)

        console.log(secret, 'secret')

        // build the Tokens
        const accessToken = await new jose.SignJWT({ 'urn:sv:un': encodeUsername })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuer('urn:sv:as')
            .setAudience('urn:sv:as')
            .setExpirationTime('12h')
            .setIssuedAt()
            .sign(secret)

        return NextResponse.json({ accessToken: accessToken }, { status: 200 })

        // authenticate the user Tokens
        // const authenticateToken = (req, res, next) => {
        //     const authHeader = req.headers['authorization']
        //     const token = authHeader && authHeader.split(' ')[1]
        //     if (token == null) return res.status(401).json({ error: 'No token provided' })
        //     jwt.verify(token, process.env.MY_SECRET, (err, userName) => {
        //         if (err) return res.status(403).json({ error: 'Invalid token' })
        //         req.user = user
        //         next()
        //     })
        // }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
