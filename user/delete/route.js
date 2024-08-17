import { NextResponse } from 'next/server'

import { deleteUser } from '@/app/sakoku/user'

export async function DELETE(req) {
    const userId = req.nextUrl.searchParams.get('id')
    try {
        await deleteUser(userId)
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting user' }, { status: 500 })
    }
}
