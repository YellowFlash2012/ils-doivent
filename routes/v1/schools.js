import express from "express";
import { getAllUsersByAdmin, loginSchool, registerNewSchool } from "../../controllers/v1/schools.js";

const router = express.Router();

router.route("/").post(registerNewSchool).get(getAllUsersByAdmin)

router.route("/login").post(loginSchool)

export default router;