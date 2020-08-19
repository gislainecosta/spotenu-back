enum UserType {
    BAND = "BAND",
    PAY_USER = "PAY_USER",
    NOPAY_USER = "NOPAY_USER",
    ADMIN = "ADMIN"
}

interface UserSignupDTO {
    id: string;
    name: string;
    nickname: string;
    email: string;
    password: string;
    role: UserType;
};


interface UserReqDTO {
    name: string;
    nickname: string;
    email: string;
    password: string;
    role: UserType;
};

interface AdminReqDTO {
    name: string;
    nickname: string;
    email: string;
    password: string;
    role: UserType;
    token: string;
};
interface BandDTO{
    id: string;
    name: string;
    nickname: string;
    email: string;
    password: string;
    role: UserType;
    aproved: number;
    description: string;
}

interface UserIdDTO {
    id: string;
}

class User {
    constructor(
        private id: string,
        private name: string,
        private nickname: string,
        private email: string,
        private password: string,
        private role: UserType,
    ) { }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getNickname(): string {
        return this.nickname;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): string {
        return this.role;
    }

    setId(id: string) {
        this.id = id;
    }

    setName(name: string) {
        this.name = name;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setNickname(nickname: string) {
        this.nickname = nickname;
    }

    static toUserModel(user: any): User {
        return new User(user.id, user.name, user.nickname, user.email, user.password, user.role);
    }
}

export { User, UserReqDTO, AdminReqDTO, UserSignupDTO, UserIdDTO, UserType, BandDTO }
