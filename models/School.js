import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const { Schema } = mongoose;

const schoolSchema = new Schema(
    {
        name: { type: String, required: true },

        school_principal: { type: String, required: true },
        
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
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