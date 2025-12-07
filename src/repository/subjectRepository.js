const prisma = require('../config/dbConfig')

const getAllSubjects = async () => {
    try {
        const subjects = await prisma.subjects.findMany()
        return subjects
    } catch (error) {
        console.log('Subject Repository Error: ', error)
        throw Error('Internal Server Database Not Respond :(')
    }
}

const addSubject = async (subject_name) => {
    try {
        const newSubject = await prisma.subjects.createMany({
            data: subject_name
        })
        return newSubject
    } catch (error) {
        console.log('Subject Repository Error: ', error)
        throw Error('Internal Server Database Not Respond :(')
    }
}

const getLastSubject = async (dataSubject) => {
    try {
        const subject = await prisma.subjects.findMany({
            where: {
                OR: dataSubject
            },
            take: dataSubject.length,
            orderBy: {
                id: 'desc'
            }
        })
        return subject
    } catch (error) {
        console.log('Subject Repository Error: ', error)
        throw Error('Internal Server Database Not Respond :(')
    }
}

module.exports = {
    getAllSubjects, 
    addSubject,
    getLastSubject
}