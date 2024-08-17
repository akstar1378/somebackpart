import { updateUser } from '@/app/sakoku/user'
import { NextResponse } from 'next/server'

export async function POST(req) {
    userId = req.nextUrl.searchParams.get('id')
    const { username, password, lastName, firstName, email } = await req.json()
    try {
        await updateUser(userId, { username, password, lastName, firstName, email })
        return NextResponse({ success: true }, { status: 200 })
    } catch (error) {
        return NextResponse({ error: error }, { status: 500 })
    }
}
