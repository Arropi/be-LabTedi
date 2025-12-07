const { z, ZodError} = require('zod')

const validateAddRooms = async(req, res, next) =>{
    try {
        const room_name = z.string({
            error: (iss) =>
                iss.input === undefined
            ? "Field Room Name Cannot Be Empty"
            : "Invalid input on Room Name",
        }).parse(req.body.room_name)
        if (!room_name) {
            throw new Error("Room Name is required")
        }
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
    validateAddRooms
}