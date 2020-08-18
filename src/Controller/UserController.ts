import { Request, Response } from "express";
import UserBusiness from '../Business/UserBusiness';
import UserDatabase from "../Data/UserDb";
import IdGenerator from "../Services/IdGenerator";
import Authenticator from "../Services/Authenticator";
import HashManager from "../Services/HashManager";
import { UserSignupDTO } from "../Model/UserDTO";

export class UserController{

    async signupUser(req: Request, res: Response): Promise<void> {
        try {
            const userBusiness = new UserBusiness();
            if (!req.body.name || !req.body.email || !req.body.password || !req.body.role || !req.body.nickname) {
                throw new Error("Invalid input");
            }
            if (req.body.email.indexOf("@") === -1) {
                throw new Error("Invad email address");
            }
            if (req.body.password.lenght < 6) {
                throw new Error("Invalid password lenght");
            }

            const idGenerator = new IdGenerator();

            const id = idGenerator.generateId();
            
            const hashManager = new HashManager();
            const hashPassword = await hashManager.hash(req.body.password);

            
            const user: UserSignupDTO = {
                id: id,
                name: req.body.name,
                nickname: req.body.nickname,
                email: req.body.email,
                password: hashPassword,
                role: req.body.role
            };

            await userBusiness.signup(user);
            const authenticator = new Authenticator();
            const accessToken = authenticator.generateToken({id, role:user.role})

            res
                .status(200)
                .send({ token: accessToken });
        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    }

    async signupAdmin(req: Request, res: Response): Promise<void> {
        try {
            const userBusiness = new UserBusiness();
            
            if (!req.body.name || !req.body.email || !req.body.password || !req.body.role || !req.body.nickname) {
                throw new Error("Invalid input");
            }
            if (req.body.email.indexOf("@") === -1) {
                throw new Error("Invad email address");
            }
            if (req.body.password.lenght < 10) {
                throw new Error("Invalid password lenght");
            }

            const token = req.headers.token as string;
            const userAuthenticator = new Authenticator();
            const authenticationData = userAuthenticator.getData(token);
            const userRole = authenticationData.role;

            if (userRole !== "ADMIN") {
                throw new Error("Somente Administradores podem criar outros administradores");
            }

            const idGenerator = new IdGenerator();

            const id = idGenerator.generateId();
            const hashManager = new HashManager();
            const hashPassword = await hashManager.hash(req.body.password);


            const user: UserSignupDTO = {
                id: id,
                name: req.body.name,
                nickname: req.body.nickname,
                email: req.body.email,
                password: hashPassword,
                role: req.body.role
            };

            await userBusiness.signup(user);
            const authenticator = new Authenticator();
            const accessToken = authenticator.generateToken({ id, role: user.role })

            res
                .status(200)
                .send({ token: accessToken });
        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    }
}