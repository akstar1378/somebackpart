import { NextResponse } from 'next/server'

export async function POST(req, res) {
    const { sign } = await req.json()
    if (!sign) {
        return NextResponse.json({ error: 'invalid payload' })
    }
    const data = JSON.parse(req.rawBody)
    delete data.sign
    const hash = Crypto.createHash('md5')
        .update(Buffer.from(JSON.stringify(data)).toString('base64') + process.env.API_KEY)
        .digest('hex')
    if (hash !== sign) {
        return NextResponse.json({ error: 'invalid signature' }, { status: 403 })
    }
    return res.status(200).json({ message: 'success' })
}
