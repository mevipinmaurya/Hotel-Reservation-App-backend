import express from "express";
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/user.controller.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/chechauthentication", verifyToken, (req, res)=>{
//     res.send("You are verified and loged in")
// })

// router.get("/checkuser/:id", verifyUser, (req, res)=>{
//     res.send("Hello user! You are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res)=>{
//     res.send("Hello admin! You are logged in and you can delete any account")
// })


router.put("/:id", verifyUser, updateUser)
router.delete("/:id", verifyUser, deleteUser)
router.get("/:id", verifyUser, getUser)
router.get("/", verifyAdmin, getAllUser)

export default router;