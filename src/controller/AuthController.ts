import { Request, Response } from 'express';
import { AuthService } from "../service/AuthService";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async signUp(req: Request, res: Response) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const username = req.body.username;
            if (!email || !password || !username) {
                res.status(400).json({ success: false, message: 'Email, mot de passe et nom d\'utilisateur sont requis.' });
                return;
            }
            const data = await this.authService.signUp(email, password, username);
            if (data.success) {
                res.status(201).json({success: data.success})
            }else{
                res.status(400).json({success: data.success, message: data.message})
            }
            
        } catch (error) {
            res.status(400).json({success: false, message: (error as Error).message})
        }
    }

    async signIn(req: Request, res: Response) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            if (!email || !password) {
                res.status(400).json({ success: false, message: 'Email et mot de passe sont requis.' });
                return;
            }
            const result = await this.authService.signIn(email, password);
            if (result.success) {
                res.status(200).json({success: result.success, data: result.data});
            } else {
                res.status(401).json({success: result.success, message: result.message});
            }
            
        } catch (error) {
            res.status(400).json({success: false, message: (error as Error).message})
        }   
    }
}