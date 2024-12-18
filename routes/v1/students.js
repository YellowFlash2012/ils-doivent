import express from "express";
import { addNewDebitor, deleteDebitor, getAllDebitors, getOneDebitor } from "../../controllers/v1/students.js";
import { protect } from "../../middleware/auth.js";

const router = express.Router();

router.route("/").get(getAllDebitors).post(protect, addNewDebitor);

router.route("/:id").get(protect, getOneDebitor).delete(protect,  deleteDebitor);

export default router;
