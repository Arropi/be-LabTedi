const { getAllSubjects, addSubject, getLastSubject } = require("../repository/subjectRepository")
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
        const dataSubject = subject_name.map((name) => ({ subject_name: name, created_at: new Date(), updated_at: new Date() }))
        const newSubject = await addSubject(dataSubject)
        const dataQuery = dataSubject.map((subj) => (
            { 
            AND: [
                {subject_name: subj.subject_name},
                
            ]
        }
        ))
        const getTheSubject = await getLastSubject(dataQuery)
        const safeSubject = bigintToNumber(getTheSubject)
        return safeSubject
    } catch (error) {
        throw error
    }
}

module.exports = {
    getListSubjectService,
    addSubjectService
}