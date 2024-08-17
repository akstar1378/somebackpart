import { NextResponse } from 'next/server'

import { checkDuplicateDevice } from '@/app/sakoku/external/device'

export async function GET(req) {
    const { deviceSystemId } = req.json()
    try {
        let deviceDuplicate = await checkDuplicateDevice(deviceSystemId)
        if (deviceDuplicate) {
            return NextResponse.json('device already exists', { status: 400 })
        }

        return NextResponse.json('device does not exist', { status: 200 })
    } catch (error) {
        return NextResponse.json(error, 'error', { status: 500 })
    }
}
