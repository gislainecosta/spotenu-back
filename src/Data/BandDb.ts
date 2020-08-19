import knex from "knex";
import BaseDatabase from "./BaseDb";
import { BandDTO } from "../Model/User"

export default class BandDb extends BaseDatabase {

    private static TABLE_NAME: string = "spotenu";

    public createBand = async (user: BandDTO): Promise<void> => {
        await this.getconnection()
            .insert({
                id: user.id,
                name: user.name,
                nickname: user.nickname,
                email: user.email,
                password: user.password,
                role: user.role,
                aproved: user.aproved,
                description: user.description
            })
            .into(BandDb.TABLE_NAME)
    }
}