import { UserSignupDTO, UserReqDTO, AdminReqDTO } from "../Model/User"
import UserDb from './../Data/UserDb';
import IdGenerator from "../Services/IdGenerator";
import HashManager from "../Services/HashManager";
import Authenticator from "../Services/Authenticator";


export default class UserBusiness {
    private userDb = new UserDb();

    public async signupUser(user: UserReqDTO) {
        if (!user.name || !user.email || !user.password || !user.role || !user.nickname) {
            throw new Error("Invalid input");
        }
        if (user.email.indexOf("@") === -1) {
            throw new Error("Invad email address");
        }
        if (user.password.length < 6) {
            throw new Error("Invalid password lenght");
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generateId();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(user.password);

        const userSignup:  UserSignupDTO = {
            id: id,
            name: user.name,
            nickname: user.nickname,
            email: user.email,
            password: hashPassword,
            role: user.role
        };
        
        await this.userDb.signup(userSignup);

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id, role: user.role })

        return accessToken
    }

    public async signupAdmin(user: AdminReqDTO) {
        if (!user.name || !user.email || !user.password || !user.role || !user.nickname) {
            throw new Error("Invalid input");
        }
        if (user.email.indexOf("@") === -1) {
            throw new Error("Invad email address");
        }
        if (user.password.length < 10) {
            throw new Error("Invalid password lenght");
        }

        const userAuthenticator = new Authenticator();
        const authenticationData = userAuthenticator.getData(user.token);
        const userRole = authenticationData.role;

        if (userRole !== "ADMIN") {
            throw new Error("Somente Administradores podem criar outros administradores");
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generateId();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(user.password);

        const userSignup: UserSignupDTO = {
            id: id,
            name: user.name,
            nickname: user.nickname,
            email: user.email,
            password: hashPassword,
            role: user.role
        };

        await this.userDb.signup(userSignup);

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id, role: user.role })

        return accessToken
    }

    public async login(nickname:string, password:string): Promise<any>{
        try {
            if (!nickname || !password) {
                throw new Error("Invalid input");
            }

            const user = await this.userDb.getByNickname(nickname)

            const hashManager = new HashManager();
            const correctPassword = await hashManager.compare(
                password,
                user.getPassword()
            );

            if (!correctPassword) {
                throw new Error("Invalid password");
            }

            const authenticator = new Authenticator();
            const accessToken = await authenticator.generateToken({ id: user.getId(), role: user.getRole() })

            return accessToken

        } catch (error) {
            throw new Error(error.message || "Error login. Please check yours inputs.");
        }



    }
}