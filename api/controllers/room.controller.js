import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";


export const createRoom = async (req, res, next) => {

    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();

        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
        } catch (error) {
            next(error)
        }

        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        return res.status(201).json(updatedRoom)
    } catch (error) {
        next(error)
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    try {
        await Room.findByIdAndDelete(req.params.id, { new: true })
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } })
        } catch (error) {
            next(error)
        }
        return res.status(201).json("Room has been deleted")
    } catch (error) {
        next(error)
    }
}

export const getRoom = async (req, res, next) => {
    try {
        const getRoom = await Room.findById(req.params.id);
        return res.status(201).json(getRoom)
    } catch (error) {
        next(error)
    }
}

export const getAllRoom = async (req, res, next) => {
    try {
        const getAllRoom = await Room.find();
        return res.status(201).json(getAllRoom)
    } catch (error) {
        next(error)
    }
}