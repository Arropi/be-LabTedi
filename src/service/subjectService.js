const { getAllSubjects, addSubject } = require("../repository/subjectRepository")
const { bigintToNumber } = require("../utils/functions")

const getListSubjectService = async () => {
    try {
        const subjects = await getAllSubjects()
        const information = subjects.map((s)=> {
            return {
                ...s,
                id: Number(s.id),
            }
        })
        return information
    } catch (error) {
        throw error
    }
}

const addSubjectService = async (subject_name) => {
    try {
        const newSubject = await addSubject(subject_name)
        const safeSubject = bigintToNumber(newSubject)
        return safeSubject
    } catch (error) {
        throw error
    }
}

module.exports = {
    getListSubjectService,
    addSubjectService
}