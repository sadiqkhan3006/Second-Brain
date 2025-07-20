import mongoose from "mongoose";
import "dotenv/config";
export default async function Dbconnect(): Promise<void> {
    try {
        const DB_URL = process.env.DB_URL;
        if (!DB_URL) throw new Error("DB url not defined");
        await mongoose.connect(DB_URL, {
            family: 4,
        });
        console.log("DB Connected !!");
    } catch (error) {
        console.log("Db connection failed!!");
        console.error(error);
        process.exit(1);
    }

}

