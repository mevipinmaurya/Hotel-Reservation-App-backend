import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    maxPeople: { type: Number, required: true },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
}, { timestamps: true })

const Room = mongoose.model("Room", RoomSchema)

export default Room;