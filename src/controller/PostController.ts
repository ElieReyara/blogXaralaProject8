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
            const result = await this.postService.getAllPosts();

            if (result.success) {
                res.status(200).json({ posts: result.data, message: "Articles recupere avec succes"});
                console.log('Articles recupere avec succes au niveau du controllers');
            } else {
                console.log('Erreur lors de la recuperation des articles(level controllers)');
                res.status(500).json({ message: result.error });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur" });
        }
    }  
    
    // 4. Methode pour gerer la requete POST
    async pushPost(req : Request, res : Response){
        try {
            // 4.1 J'appelle la methode pushPost du PostService pour creer un nouvel article
            const result = await this.postService.pushPost(req.body);
            // 4.2 Je renvoie une reponse de succes au client
            if (result.success) {
                res.status(201).json({ message: result.message });
                return;
            }
            // 4.3 En cas d'echec, je renvoie une reponse d'erreur(erreur liee a la base de donnee)
            // Ca c'est pour le cote client
            res.status(400).json({ message: "Erreur lors de la création du nouvel article : " + result.message });
            // Ca c'est pour le cote serveur
            console.log('Erreur lors de la création du nouvel article au niveau du controller : ' + result.message);
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur" });
        }
    }

    // 5. Methode pour gerer la requete PUT /posts/:id
    async updatePost(req : Request, res : Response){
        try{
            const postId = parseInt(req.params.id, 10);
            // 5.1 J'appelle la methode updatePost du PostService pour modifier l'article
            const result = await this.postService.updatePost(postId, req.body);
            if (result.success) {
                res.status(200).json({ message: result.message });
                return;
            }
            res.status(400).json({ message: "Erreur lors de la mise à jour de l'article : " + result.message });
            console.log('Erreur lors de la mise à jour de l\'article au niveau du controller : ' + result.message);
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur" });
        }
    }

    // 6. Methode pour gerer la requete DELETE /posts/:id
    async deletePost(req : Request, res : Response){
        try{
            const postId = parseInt(req.params.id, 10);
            // 6.1 J'appelle la methode deletePost du PostService pour supprimer l'article
            const result = await this.postService.deletePost(postId);
            if (result.success) {
                res.status(200).json({ message: result.message });
                return;
            }
            res.status(400).json({ message: "Erreur lors de la suppression de l'article : " + result.message });
            console.log('Erreur lors de la suppression de l\'article au niveau du controller : ' + result.message);
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur" });
        }
    }}