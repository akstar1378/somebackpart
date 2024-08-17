import axios from 'axios'
import { NextResponse } from 'next/server'
import Crypto from 'crypto'

export async function POST(req) {
    const { amount, currency, orderId } = await req.json()
    const data = {
        amount: amount,
        currency: currency,
        orderId: orderId
    }
    const sign = Crypto.createHash('md5')
        .update(Buffer.from(JSON.stringify(data)).toString('base64') + process.env.API_KEY)
        .digest('hex')
    try {
        const response = await axios.post('https://api.cryptomus.com/v1/payment', data, {
            headers: {
                merchant: process.env.MERCHANT_ID,
                sign: sign,
                url_callback: 'http://localhost:3000/api/v1/external/cryptomus/webhook'
            }
        })
        return NextResponse(response.data.result.url)
    } catch (error) {
        console.error(error)
        return NextResponse.status(500).json({ error: 'Internal server error' })
    }
}
