import asyncHandler from "express-async-handler";
import School from "../../models/School.js";
import generateToken from "../../utils/generateToken.js";


// @desc    Sign up a new school
// @route   POST /api/v1/schools/
// @access  Private / Admin Only
export const registerNewSchool = asyncHandler(async(req, res) => {
    const { name, email, school_principal, password } = req.body;

    const existingSchool = await School.findOne({ email });

    if (existingSchool) {
        res.status(400);

        throw new Error(
            "A school with this email address already exists, please login!"
        );
    }

    const school = await School.create({ name, email, school_principal, password });

    if (school) {
        generateToken(res, school._id);

        res.status(201).json({
            message: `Welcome aboard, ${school.name}!`,
            data: {
                _id: school._id,
                name: school.name,
                email: school.email,
                school_principal:school.school_principal,
                isAdmin: school.isAdmin,
            },
        });
    } else {
        res.status(400);
        throw new Error("Invalid school data!");
    }
})

// @desc    Log in a school
// @route   POST /api/v1/schools/login
// @access  Private
export const loginSchool = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const school = await School.findOne({ email });

    if (school && (await school.matchPw(password))) {
        generateToken(res, school._id);

        res.status(200).json({
            message: `Welcome back, ${school.name}`,
            data: {
                _id: school._id,
                name: school.name,
                email: school.email,
                school_principal: school.school_principal,
                isAdmin: school.isAdmin,
            },
        });
    } else {
        res.status(401);
        throw new Error("Invalid credentials");
    }
})