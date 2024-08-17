import { NextResponse } from 'next/server'

import { updateServer } from '@/app/sakoku/server'
import { serverSchema } from '@/app/sakoku/validation/server-validation'
import { serverUpdateSchema } from '@/app/sakoku/validation/serverUpdate-validation'

export async function POST(req) {
    const systemId = req.nextUrl.searchParams.get('id')
    const { ip, serverId, location, protocol, type, maxLength } = await req.json()

    let parsedServer = await serverUpdateSchema.validate(
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

    parsedServer = serverUpdateSchema.cast(parsedServer)

    try {
        await updateServer(systemId, parsedServer)
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}
