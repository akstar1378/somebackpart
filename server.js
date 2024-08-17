import { uuid } from 'uuidv4'

import { PrismaClient, ServerType } from '@prisma/client'

import { serverSchema } from '@/app/sakoku/validation/server-validation'

const prisma = new PrismaClient()

export async function addServer(serverData) {
    const { ip, serverId, location, protocol, type, maxLength } = serverData

    try {
        let systemId = uuid()

        return await prisma.server.create({
            data: {
                systemId,
                ip,
                location,
                protocol,
                serverId,
                maxUserCount: maxLength,
                type: type
            }
        })
    } catch (error) {
        console.log(error, 'Error in server.js -> postServer')

        return false
    }
}

export async function deleteServer(serverId) {
    try {
        return await prisma.server.deleteMany({
            where: { systemId: serverId }
        })
    } catch (error) {
        console.log(error, 'error in server.js->deleteServer')
    }
}

export async function updateServer(systemId, serverData) {
    let { ip, location, protocol, type, maxLength, serverId } = serverData
    try {
        return await prisma.server.updateMany({
            where: {
                systemId: systemId
            },
            data: {
                ip,
                serverId: serverId,
                location: location,
                protocol: protocol,
                type: type,
                maxUserCount: maxLength,
                updatedAt: new Date()
            }
        })
    } catch (error) {
        console.log(error, 'error in server.js -> updateServer')
    }
}

export async function getServer(serverId = null) {
    try {
        let where = {}

        if (serverId) where = { systemId: serverId }

        return await prisma.server.findMany({
            where: where,

            // skip: 10,
            // take: 10,
            orderBy: { createdAt: 'desc' }
        })
    } catch (error) {
        console.log(error, 'error in server.js -> getServer')

        return false
    }
}
export async function getServerFilterType(type) {
    try {
        return await prisma.server.findMany({
            where: {
                OR: [
                    {
                        type: { in: [type] }
                    }
                ]
            },
            orderBy: { createdAt: 'desc' }
        })
    } catch (error) {
        console.log(error, 'error in server.js -> getServerFilterType')
    }
}

export async function duplicateChecker(ip) {
    try {
        let duplicationStatus = await prisma.server.findMany({
            where: {
                ip: ip
            }
        })

        return !duplicationStatus.length
    } catch (error) {
        console.log(error, 'Error in server.js -> duplicateChecker')

        return false
    }
}
