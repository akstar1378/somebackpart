import { addDevice } from '@/app/sakoku/external/device'
import { NextResponse } from 'next/server'

export async function POST(req) {
    const { deviceSystemId, deviceModel, androidId, osType, osVersion } = await req.json()

    try {
        await addDevice({ deviceModel, androidId, osType, osVersion, deviceSystemId })
        return NextResponse.json({ message: 'Device added successfully' }, { success: true })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
