import { UserRepository } from "../repository/UserRepository";

export class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async signUp(req: Request, res: Response) {
        
    }
}