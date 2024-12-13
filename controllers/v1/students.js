import asyncHandler from "express-async-handler"
import Student from "../../models/Student.js";


// @desc    Get all the debitors
// @route   GET /api/v1/students
// @access  Private
export const getAllDebitors = asyncHandler(async (req, res) => {
    // search config
    const keyword = req.query.keyword
        ? { student_name: { $regex: req.query.keyword, $options: "i" } }
        : {};
    
    const debitors = await Student.find({ ...keyword });
    
    res.status(200).json({
        success: true,
        count: debitors.length,
        data: debitors,
    });
})

// @desc    Get one debitor
// @route   GET /api/v1/students/:id
// @access  Private
export const getOneDebitor = asyncHandler(async (req, res) => {
    const debitor = await Student.findById(req.params.id);

    if (debitor) {
        res.status(200).json({
            success: true,
            message: "Here is the requested debitor",
            data: debitor,
        });
    } else {
        res.status(404);
        throw new Error("Ce débiteur n'existe pas!");
    }
})

// @desc    Add a new debitor
// @route   POST /api/v1/students
// @access  Private
export const addNewDebitor = asyncHandler(async (req, res) => {
    const { student_name, student_nip, academic_year, outstanding_debt } =
        req.body;

    if (!student_name || !student_nip || !academic_year || !outstanding_debt) {
        throw new Error("Veuillez remplir les champs obligatoires!");
    }

    const existingDebitor = await Student.findOne({student_nip})
    
    if (existingDebitor) {
        throw new Error("Ce débiteur existe déjà!");
    }

    req.body.school = req.user._id;

    const newDebitor = await Student.create(req.body);

    res.status(201).json({
        success: true,
        message: `Débiteur ${student_name} a été ajouté avec succès!`,
        data: newDebitor,
    });
 })

// @desc    Delete one debitor
// @route   DELETE /api/v1/students/:id
// @access  Private
export const deleteDebitor = asyncHandler(async (req, res) => {
    const debitor = await Student.findById(req.params.id);

    // check permission
    if (req.user._id === debitor.school.toString() || req.user.isAdmin) {
        next();
    } else {
        throw new Error("Vous ne pouvez pas exécuter cette opération!");
    }

    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: `${debitor.student_name} a été supprimé avec succès!`,
    });
})