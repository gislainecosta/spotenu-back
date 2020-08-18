import knex from "knex";
import BaseDatabase from "./BaseDb";
import {UserSignupDTO} from "../Model/UserDTO"

export default class UserDb extends BaseDatabase {

    private static TABLE_NAME: string = "spotenu";

    public signup = async (user: UserSignupDTO): Promise<void> =>{
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
    }

}