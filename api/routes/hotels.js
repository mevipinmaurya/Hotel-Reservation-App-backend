import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {

    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save()
        return res.status(201).json(savedHotel)
    } catch (error) {
        res.status(500).json(error)
    }
})


// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        return res.status(201).json(updatedHotel)
    } catch (error) {
        res.status(500).json(error)
    }
})


// DELETE
router.delete("/:id", async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id, { new: true })
        return res.status(201).json("Hotel has been deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET
router.get("/:id", async (req, res)=>{
    try {
        const getHotel = await Hotel.findById(req.params.id);
        return res.status(201).json(getHotel)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET ALL
router.get("/", async (req, res)=>{
    try {
        const getAllHotel = await Hotel.find();
        return res.status(201).json(getAllHotel)
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router;