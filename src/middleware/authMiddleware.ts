import { supabaseClient } from "../repository/db/supabaseClient";
import { NextFunction, Request, Response } from 'express';

export async function authMiddleware(req : Request, res : Response, next: NextFunction) {
    const authHeader = req.headers.authorization

 
    if (!authHeader) {
        return res.status(401).json({ error: 'Token manquant' });
    }
    const token = authHeader.replace('Bearer ', '');
    
    try {
        // IMPORTANT: On attend la réponse de Supabase
        const { data, error } = await supabaseClient.auth.getUser(token);

        if (error || !data.user) {
            return res.status(401).json({ error: 'Token invalide ou expiré' });
        }

        // Étape clé : On stocke l'user trouvé dans la requête
        // pour que le Controller puisse savoir qui écrit.
        (req as any).user = data.user;

        // On donne le feu vert pour passer au Controller
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Erreur lors de la vérification du token' });
    }


}