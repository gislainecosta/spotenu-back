import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import userRouter from "./Router/UserRouter";
import  UserDatabase from "./Data/UserDb";


dotenv.config();

const app = express();

app.use(express.json());

app.use("/user", userRouter);



const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});
