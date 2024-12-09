import express from "express";
import { loginSchool, registerNewSchool } from "../../controllers/v1/schools.js";

const router = express.Router();

router.route("/").post(registerNewSchool)

router.route("/login").post(loginSchool)

export default router;