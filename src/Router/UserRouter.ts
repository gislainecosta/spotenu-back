import express from "express";
import { UserController } from "../Controller/UserController";

const userRouter = express.Router();

userRouter.post("/", new UserController().signupUser)
userRouter.post("/admin", new UserController().signupAdmin)
userRouter.post("/login", new UserController().login)

export default userRouter;
