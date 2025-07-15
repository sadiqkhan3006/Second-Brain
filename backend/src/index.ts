import express from "express";
import Dbconnect from "./config/db";
const app = express();
let Port: number = 3000;
app.use(express.json())
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