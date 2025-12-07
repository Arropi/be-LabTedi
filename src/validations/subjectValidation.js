const {z, ZodError} = require('zod')

const validateAddSubjects = async(req, res, next) =>{
    try {
        const subject_name = z.array(z.string({
            error: (iss) =>
                iss.input === undefined
            ? "Field Subject Name Cannot Be Empty"
            : "Invalid input on Subject Name",
        }), 'Invalid input on Subject Name').parse(req.body.subject_name)
        next()
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: error.issues[0].message,
            })
        } else {
            res.status(500).json({
                message: error.message,
            });
        }
    }
}

module.exports = {
    validateAddSubjects
}