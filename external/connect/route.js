import { aesString } from '@/app/sakoku/encryptData'
import { NextResponse } from 'next/server'
import { uuid } from 'uuidv4'

export async function GET(req) {
    try {
        let connectionString = uuid().toString()
        let securedConnection = aesString.encrypt(connectionString)
        if (securedConnection.length) {
            return NextResponse.json({ connection: securedConnection }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
