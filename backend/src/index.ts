import express from "express";
import Dbconnect from "./config/db";
import userRoutes from "./routers/user";
const app = express();
let Port: number = 3000;
app.use(express.json())
app.use("/api/v1/user", userRoutes);
Server();
async function Server(): Promise<void> {
    try {
        await Dbconnect();
        app.listen(Port, () => {
            console.log("Server started and running on 3000");
        });
    }
    catch (err) {
        console.log("server Crashed");
        console.error(err);
    }
}