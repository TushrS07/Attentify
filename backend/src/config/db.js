import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log('[CONFIG] 🔌 Connecting to MongoDB...');
        // Use your MongoDB URI (local or Atlas)
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`[CONFIG] ✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`[CONFIG] 📊 Database Name: ${conn.connection.name}`);
    } catch (error) {
        console.error(`[CONFIG] ❌ MongoDB Connection Failed: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;

