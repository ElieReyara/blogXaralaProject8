// C'est ici qu'on assemble tout les blocs de l'application
// On configure le serveur Express, les routes, et on demarre le serveur
import express, { Request, Response } from "express";
import * as dotenv from 'dotenv';

// httpMocks pour cree des donnes fictives
import httpMocks from 'node-mocks-http';

import { PostController } from "./controller/PostController";
import { PostService } from "./service/PostService";
import { PostRepository } from "./repository/PostRepository";

// Donne fictive pour l'exemple
const fakePosts = [
    { title: "Premier article", content: "Contenu du premier article", author : "Alice" },
    { title: "Deuxième article", content: "Contenu du deuxième article", author : "Alice" }
];

dotenv.config();
const app = express();
app.use(express.json()); // Pour qu'Express puisse lire le JSON dans les requêtes

// 1. On crée une instance de PostRepository
const postRepository = new PostRepository();

// 2. On crée une instance de PostService en lui passant le PostRepository
const postService = new PostService(postRepository);

// 3. On crée une instance de PostController en lui passant le PostService
const postController = new PostController(postService);

// 4. On définit les routes et on les lie aux méthodes du PostController
// Quand une requête GET est faite à /posts, on appelle la méthode getAllPosts du PostController
app.get("/posts", (req: Request, res: Response) => postController.getAllPosts(req, res));

// Quand une requete POST est faite a /posts/create, on appele pushPost
const mockRequest = httpMocks.createRequest({
    method: 'POST',
    url: '/posts/create',
    body: fakePosts[0]
}); 

const mockResponse = httpMocks.createResponse();
app.post("//posts/create", (req: Request, res: Response) => postController.pushPost(req = mockRequest, res))

// 5. On démarre le serveur sur le port défini dans les variables d'environnement ou 3000 par défaut
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});