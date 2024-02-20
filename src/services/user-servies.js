const prisma = require(`../models/prisma`)

exports.findUserByEmail = email =>
    prisma.user.findFirst({
        where: {
            OR: [
                { email: email },
            ]
        }
    })
exports.findUserByCitizenIdentifyNumber = citizenIdentifyNumber =>
    prisma.user.findFirst({
        where: {
            OR: [
                { citizenIdentifyNumber: citizenIdentifyNumber },
            ]
        }
    })
exports.createUser = data => prisma.user.create({ data })