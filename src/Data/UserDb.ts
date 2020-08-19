import knex from "knex";
import BaseDatabase from "./BaseDb";
import {UserSignupDTO} from "../Model/User"
import { User } from "../Model/User";

export default class UserDb extends BaseDatabase {

    private static TABLE_NAME: string = "spotenu";

    async signup (user: UserSignupDTO): Promise<void>{
        try {
            await this.getconnection()
                .insert({
                    id: user.id,
                    name: user.name,
                    nickname: user.nickname,
                    email: user.email,
                    password: user.password,
                    role: user.role
                })
                .into(UserDb.TABLE_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
        
        
        
    }

    async getByNickname (nickname:string): Promise<User>{
        try {
            const result = await this.getconnection().raw(
            `
            SELECT *
            FROM ${UserDb.TABLE_NAME}
            WHERE nickname = "${nickname}";
            `
            );

            return User.toUserModel(result[0][0]);

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}