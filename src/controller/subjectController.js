const { getListSubjectService, addSubjectService } = require("../service/subjectService")

const getListSubject = async (req, res) => {
    try {
        const subjects = await getListSubjectService()
        return res.status(200).json({
            'messsage': 'Getting data subjects successfully',
            'data': subjects
        })
    } catch (error) {
        console.log(error)
        if (error.cause == 'Bad Request') {
            res.status(400).json({
                'message': error.message
            })
        } else {
            res.status(500).json({
                'message': error.message
            })
        }
    }
}

const addSubject = async (req, res) => {
    try {
        const { subject_name } = req.body
        const newSubject = await addSubjectService(subject_name)
        return res.status(201).json({
            'message': 'Subject added successfully',
            'data': newSubject
        })
    } catch (error) {
        console.log(error)
        if (error.cause == 'Bad Request') {
            res.status(400).json({
                'message': error.message
            })
        } else {
            res.status(500).json({
                'message': error.message
            })
        }
    }
}

module.exports = {
    getListSubject,
    addSubject
}