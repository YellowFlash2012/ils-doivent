import express from "express";

const router = express.Router();

router.route("/").post();

router.route("/login").post();

export default router;
