import { Request, Response } from "express";
import UserBusiness from '../Business/UserBusiness';
import { UserReqDTO, AdminReqDTO } from "../Model/User";
import BaseDataBase from './../Data/BaseDb';

export class UserController{

    async signupUser(req: Request, res: Response): Promise<void> {
        try {
            const userBusiness = new UserBusiness();
            
            
            const user: UserReqDTO = {
                name: req.body.name,
                nickname: req.body.nickname,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            };

            const accessToken = await userBusiness.signupUser(user);
            
            res
                .status(200)
                .send({ token: accessToken });
        } catch (err) {
            res.status(400).send({ error: err.message });
        } finally {
            BaseDataBase.destroyConnection()
        }
    }

    async signupAdmin(req: Request, res: Response): Promise<void> {
        try {
            const userBusiness = new UserBusiness();
    
            const admin: AdminReqDTO = {
                name: req.body.name,
                nickname: req.body.nickname,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role, 
                token: req.headers.token as string
            };

            const accessToken = await userBusiness.signupAdmin(admin);
            
            res
                .status(200)
                .send({ token: accessToken });
        } catch (err) {
            res.status(400).send({ error: err.message });
        } finally {
            BaseDataBase.destroyConnection()
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            
            const userData  ={
                nickname: req.body.nickname,
                password: req.body.password
            }

            const userBusiness = new UserBusiness();
            const accessToken = await userBusiness.login(userData.nickname, userData.password);

            res
                .status(200)
                .send({ token: accessToken });

            
        } catch (error) {
            res.status(400).send({ error: error.message });
        } finally {
            BaseDataBase.destroyConnection()
        }

    }
}