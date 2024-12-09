import asyncHandler from "express-async-handler";
import School from "../../models/School.js";

// @desc    Sign up a new school
// @route   POST /api/v1/users/
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
export const loginSchool=asyncHandler(async(req,res)=>{})