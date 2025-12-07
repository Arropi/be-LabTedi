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
        const newSubject = await prisma.subjects.create({
            data: {
                subject_name,
                created_at: new Date(),
                updated_at: new Date(),
            }
        })
        return newSubject
    } catch (error) {
        console.log('Subject Repository Error: ', error)
        throw Error('Internal Server Database Not Respond :(')
    }
}

module.exports = {
    getAllSubjects, 
    addSubject
}