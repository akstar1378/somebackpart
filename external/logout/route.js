// import { addJwtBlockList } from '@/app/sakoku/external/token'
import { NextResponse } from 'next/server'

export async function DELETE(req) {
    let token = req.headers.get('authorization').split(' ')[1]

    const { username } = await req.json()

    try {
        await addJwtBlockList(username, token)
        return NextResponse.json({ message: 'User logged out' }, { status: 200 })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Failed to log out user' }, { status: 500 })
    }
}
