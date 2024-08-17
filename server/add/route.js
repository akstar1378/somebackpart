import { NextResponse } from 'next/server'

import { addServer } from '@/app/sakoku/server'

import { serverSchema } from '@/app/sakoku/validation/server-validation'

export async function POST(req) {
    const { ip, serverId, location, protocol, maxLength, type } = await req.json()

    try {
        let parsedServer = await serverSchema.validate(
            {
                ip,
                serverId,
                location,
                protocol,
                type,
                maxLength
            },
            { strict: true }
        )

        parsedServer = serverSchema.cast(parsedServer)

        await addServer(parsedServer)

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        if (error.name === 'ValidationError')
            return NextResponse.json({ error: 'validation-error', fields: error.errors }, { status: 400 })
        console.log(error)
        return NextResponse.json({ error: 'error' }, { status: 500 })
    }
}
