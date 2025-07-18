import mongoose from "mongoose";
export default async function Dbconnect(): Promise<void> {
    try {
        await mongoose.connect("mongodb+srv://sadiqkhan3006:lBOcqacheINoGqWf@cluster0.xdkg3bs.mongodb.net/Second-Brain", {
            family: 4,
        });
        console.log("DB Connected !!");
    } catch (error) {
        console.log("Db connection failed!!");
        console.error(error);
        process.exit(1);
    }

}

