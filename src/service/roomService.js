const { getRooms, createRoom } = require("../repository/roomRepository")
const { bigintToNumber } = require("../utils/functions")

const getListRoomsService = async () => {
    try {
        const rooms = await getRooms()
        const information = rooms.map((s)=> {
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

const addRoomService = async (room_name) => {
    try {
        const newRoom = await createRoom(room_name)
        const safeRoom = bigintToNumber(newRoom)
        return safeRoom
    } catch (error) {
        throw error
    }
}

module.exports = {
    getListRoomsService,
    addRoomService
}