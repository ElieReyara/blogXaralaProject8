import { UserRepository } from "../repository/UserRepository";


export class AuthService{
    private userRepository : UserRepository;

    constructor(){
        this.userRepository = new UserRepository();
    }

    async signUp(email: string, password : string, username: string) : Promise<{success: boolean, message?: string, id?: string, email?: string}>{
        try {
            const data = await this.userRepository.signUp(email, password);

            if(!data.user) throw new Error('Echec de la creation du profil utilisateur, aucune donnee retournee.');

            await this.userRepository.createUserProfile(data.user.id, username);
            return {success: true, id: data.user.id, email: data.user.email};
        } catch (error) {
            return {success: false, message: (error as Error).message};
        }
    }

    async signIn(email: string, password : string) : Promise<{success: boolean, message?: string, data?: any}>{
        try {
            const result = await this.userRepository.signIn(email, password);
    
            if(!result.user || !result.session) throw new Error('Echec de la connexion de l\'utilisateur, aucune reponse du repository.');
            return {success: true, data: {
                user : result.user,
                session : result.session
            }};               
        } catch (error) {
            return {success: false, message: (error as Error).message
        }
    }
}}