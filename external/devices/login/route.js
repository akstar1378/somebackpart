import { getDevice } from '@/app/sakoku/external/device'
import { NextResponse } from 'next/server'

export async function GET(req) {
    let userId = req.nextUrl.searchparams.get('id')
    try {
        let checkDeviceLogin = await getDevice(userId)
        if (checkDeviceLogin > 2) {
            return NextResponse.json({ message: 'Device login limit exceeded' }, { status: 403 })
        }

        return NextResponse.json({ message: 'Device has permission to login' }, { status: 200 })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: 'Error in checking device login limit' }, { status: 500 })
    }
}
