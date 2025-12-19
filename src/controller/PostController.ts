// C'est ici que les requetes HTTP liees aux articles de blog sont gerees
// Le PostController recoit les requetes, appelle le PostService pour la logique metier
// Et renvoie les reponses appropriees au client
import {Request, Response } from "express";
import { PostService } from "../service/PostService";

// 1. Definir la classe PostController
export class PostController{
    // Je defini une propriete private pour stocker une instance de PostService
    private readonly postService: PostService;

    // 2. Je stocke l'instance de PostService dans le constructeur
    constructor(postService : PostService){
        this.postService = postService;
    }

    // ! METHOD CLASS

    // 3. Methode pour gerer la requete GET /posts
    async getAllPosts(req : Request, res : Response)  : Promise<void>{
        try{
            // 3.1 J'appelle la methode getAllPosts du PostService pour recuperer les articles
            const posts = await this.postService.getAllPosts();

            // 3.2 Je renvoie les articles au client avec le code 200
            res.status(200).json(posts);
            console.log('Articles recupere avec succes au niveau du controllers');
        } catch (error) {
            // Gérer les erreurs ici
            res.status(500).json({ message: "Erreur serveur" });
        }
    }  
    
    // 4. Methode pour gerer la requete POST
    async pushPost(req : Request, res : Response){
        try {
            // 4.1 J'appelle la methode pushPost du PostService pour creer un nouvel article
            await this.postService.pushPost(req.body);
            // 4.2 Je renvoie une reponse de succes au client
            res.status(201).json({ message: "Article créé avec succès" });
            console.log('Articles enregistre avec succes au niveau du controllers');
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur" });
        }
    }
}