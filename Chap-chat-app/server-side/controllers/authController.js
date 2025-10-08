import User from "../models/User.js";

export const registerUser = async (req, res) => {
    const { username } = req.body;
    try {
        let user = await User.findOne({ username });
        if (!user) user = await User.create({ username });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
