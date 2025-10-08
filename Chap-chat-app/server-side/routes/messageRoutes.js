import express from "express";
const router = express.Router();

import { getRoomMessages } from "../controllers/messageController.js";

router.get('/:roomId', getRoomMessages);

export default router;
