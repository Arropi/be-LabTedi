const { getListRoomsService, addRoomService } = require("../service/roomService")

const getListRoom = async (req, res) => {
    try {
        const rooms = await getListRoomsService()
        return res.status(200).json({
            'message': 'Getting data rooms successfully',
            'data': rooms
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

const addRoom = async (req, res) => {
    try {
        const { room_name } = req.body
        const newRoom = await addRoomService(room_name)
        return res.status(201).json({
            'message': 'Room added successfully',
            'data': newRoom
        })
    } catch (error) {
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
    getListRoom,
    addRoom
}