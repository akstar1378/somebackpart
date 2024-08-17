import { addPurchaseHistory } from '@/app/sakoku/external/purchaseHistory'
import { NextResponse } from 'next/server'
export async function POST(req) {
    const { staticIp, initialDate, expireDate, plan } = await req.json()
    let userId = req.nextUrl.searchParams.get('id')
    try {
        await addPurchaseHistory({ staticIp, plan, expireDate, initialDate }, userId)
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Error adding purchase history' }, { status: 500 })
    }
}
