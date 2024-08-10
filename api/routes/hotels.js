import express from "express";
import { createError } from "../utils/error.js";
import { createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from "../controllers/hotel.controllers.js";

const router = express.Router();

// CREATE
router.post("/", createHotel)
router.put("/:id", updateHotel)
router.delete("/:id", deleteHotel)
router.get("/:id", getHotel)
router.get("/", getAllHotel)


export default router;