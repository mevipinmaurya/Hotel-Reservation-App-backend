import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save()
        return res.status(201).json(savedHotel)
    } catch (error) {
        next(error)
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        return res.status(201).json(updatedHotel)
    } catch (error) {
        next(error)
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id, { new: true })
        return res.status(201).json("Hotel has been deleted")
    } catch (error) {
        next(error)
    }
}

export const getHotel = async (req, res, next) => {
    try {
        const getHotel = await Hotel.findById(req.params.id);
        return res.status(201).json(getHotel)
    } catch (error) {
        next(error)
    }
}

export const getAllHotel = async (req, res, next) => {
    try {
        const getAllHotel = await Hotel.find();
        return res.status(201).json(getAllHotel)
    } catch (error) {
        next(error)
    }
}
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(cities.map((city) => {
            return Hotel.countDocuments({ city: city })
        }))
        return res.status(201).json(list)
    } catch (error) {
        next(error)
    }
}
export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });
        return res.status(201).json([
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },
        ])
    } catch (error) {
        next(error)
    }
}