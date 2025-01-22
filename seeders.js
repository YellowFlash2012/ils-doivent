import express from "express";
import colors from "colors";
import bcrypt from "bcryptjs";

import { config } from "dotenv";
import asyncHandler from "express-async-handler";
import { readFile } from "fs/promises";

import connectDB from "./config/db.js";
import Student from "./models/Student.js";
import School from "./models/School.js";

// import schools from "./data/schools_mock_data.json"
// import students from "./data/students_mock_data.json"

config();

// const app = express();
// const port = process.env.PORT || 8000;
connectDB();

const importData = asyncHandler(async () => {
    const schools = JSON.parse(
        await readFile(
            new URL("./data/schools_mock_data.json", import.meta.url)
        )
    );

    const students = JSON.parse(
        await readFile(
            new URL("./data/students_mock_data.json", import.meta.url)
        )
    );

    // console.log(schools);

    // clear db
    await Student.deleteMany();
    await School.deleteMany();

    const schoolWithHashedPW = await schools.map((sch) => {
        return { ...sch, password: bcrypt.hash(sch.password, 10) };
    });

    // seed School db
    const sampleSchools = await School.insertMany(schoolWithHashedPW);
    // seed Student db
    const sampleStudents = await Student.insertMany(students);

    console.log("Data imported!".green.inverse);

    process.exit();
});

const destroyData = async () => {
    try {
        // clear the db
        await School.deleteMany();
        await Student.deleteMany();

        console.log("Data destroyed!".red.inverse);

        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
