import { NextResponse } from 'next/server'

import { getServer } from '@/app/sakoku/server'

export async function GET(req) {
    let serverIdValue = {}

    serverIdValue = req.nextUrl.searchParams.get('systemId')

    try {
        // if ((serverIdValue = {})) serversList = await getServer()

        let serversList = await getServer(serverIdValue)

        if (!serversList) throw new Error('Server not found')

        return NextResponse.json({ serversList }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'error' }, { status: 500 })
    }
}
