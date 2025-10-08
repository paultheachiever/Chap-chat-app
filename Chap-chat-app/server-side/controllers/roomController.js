import Room from "../models/Room.js";

export const getRooms = async (req, res) => {
    const rooms = await Room.find();
    res.json(rooms);
};

export const createRoom = async (req, res) => {
    const { name } = req.body;
    try {
        const room = await Room.create({ name });
        res.json(room);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
