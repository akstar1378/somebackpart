import { getUsers } from '@/app/sakoku/user'
import { NextResponse } from 'next/server'

export async function GET(req) {
    userId = req.nextUrl.searchParams.get('id')

    try {
        let listUsers = await getUsers(userId)
        if (!listUsers) throw new Error('Server not found')

        return NextResponse.json({ listUsers }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
