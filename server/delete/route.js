import { NextResponse } from 'next/server'

import { deleteServer } from '@/app/sakoku/server'

export async function DELETE(req) {
    const serverId = req.nextUrl.searchParams.get('id')

    try {
        await deleteServer(serverId)
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}
