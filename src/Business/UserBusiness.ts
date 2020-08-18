import { UserSignupDTO } from "../Model/UserDTO"
import UserDb from './../Data/UserDb';


export default class UserBusiness {
    private userDb = new UserDb();

    public async signup(user: UserSignupDTO) {

        await this.userDb.signup(user);
    }
}