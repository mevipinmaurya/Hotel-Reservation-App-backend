import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from "../controllers/hotel.controllers.js";
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router();

router.post("/", verifyAdmin, createHotel)
router.put("/:id", verifyAdmin, updateHotel)
router.delete("/:id", verifyAdmin, deleteHotel)
router.get("/find/:id", getHotel)
router.get("/", getAllHotel)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)


export default router;