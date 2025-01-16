import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        school: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "School",
        },
        title: {
            type: String,
            // required: true,
        },
        comment: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const studentSchema = new mongoose.Schema(
    {
        school: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "School",
        },
        student_name: {
            type: String,
            required: true,
        },
        student_nip: {
            type: Number,
            required: true,
            unique: true,
        },
        parent_name: {
            type: String,
        },
        parent_nip: {
            type: Number,
        },

        academic_year: {
            type: String,
            required: true,
        },
        outstanding_debt: {
            type: Number,
            required: true,
        },
        comments: [commentSchema],
    },
    {
        timestamps: true,
    }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;