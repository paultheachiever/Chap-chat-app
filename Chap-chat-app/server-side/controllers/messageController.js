import Message from "../models/Message.js";

export const getRoomMessages = async (req, res) => {
  console.log('Room ID:', req.params.roomId);
  try {
    const messages = await Message.find({ room: req.params.roomId })
      .populate('sender', 'username')
      .sort({ createdAt: 1 });

    console.log('Messages found:', messages.length);
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

