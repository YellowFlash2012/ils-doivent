import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`DB connected: ${conn.connection.host}`.cyan.bold);
    } catch (error) {
        console.error(`Error: ${error.message}`.red.bold);

        process.exit(1);
    }
};

export default connectDB;
