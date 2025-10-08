import express from "express";
const router = express.Router();

import { getRooms, createRoom } from "../controllers/roomController.js";

router.get('/', getRooms);
router.post('/', createRoom);

export default router;
