import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import validator from "validator";

const { Schema } = mongoose;

const schoolSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter the school's name"],
        },

        school_principal: {
            type: String,
            required: [true, "Please enter the school's principal name"],
        },

        email: {
            type: String,
            required: [true, "Please enter a valid email address"],
            validate: {
                validator: validator.isEmail,
                message: "Please provide a valid email address",
            },
            unique: true,
        },
        password: {
            type: String,
            required: true,
            validate: {
                validator: validator.isStrongPassword,
                message:
                    "Your password must have at least 1 special character, 1 uppercase letter, 1 lowercase letter, 1 number",
            },
            minlength: 13,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// compare passwords
schoolSchema.methods.matchPw = async function (enteredPw) {
    // console.log(this.password);
    return await bcrypt.compare(enteredPw, this.password)
};

// hash pw before saving new user
schoolSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
})

const School = mongoose.model("School", schoolSchema);

export default School;