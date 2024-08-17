import { getServerFilterType } from '@/app/sakoku/server'
import { NextResponse } from 'next/server'

export async function GET(req) {
    const [type] = await req.json()
    try {
        let filterTypeServer = await getServerFilterType(type)
        if (filterTypeServer) {
            return NextResponse.json({ filterTypeServer }, { status: 200 })
        }
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'error' }, { status: 500 })
    }
}
