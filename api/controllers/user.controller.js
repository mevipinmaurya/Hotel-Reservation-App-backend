import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        return res.status(201).json(updatedUser)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id, { new: true })
        return res.status(201).json("User has been deleted")
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const getUser = await User.findById(req.params.id);
        return res.status(201).json(getUser)
    } catch (error) {
        next(error)
    }
}

export const getAllUser = async (req, res, next) => {
    try {
        const getAllUser = await User.find();
        return res.status(201).json(getAllUser)
    } catch (error) {
        next(error)
    }
}