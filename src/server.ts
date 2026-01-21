// C'est ici qu'on assemble tout les blocs de l'application
// On configure le serveur Express, les routes, et on demarre le serveur
import express, { Request, Response } from "express";
import * as dotenv from 'dotenv';

import { PostController } from "./controller/PostController";
import { PostService } from "./service/PostService";
import { PostRepository } from "./repository/PostRepository";

import { UserRepository } from "./repository/UserRepository";
import { AuthService } from "./service/AuthService";
import { AuthController } from "./controller/AuthController";
import { authMiddleware } from "./middleware/authMiddleware";

dotenv.config();
const app = express();
app.use(express.json()); // Pour qu'Express puisse lire le JSON dans les requêtes

// 1. On crée une instance de PostRepository et de UserRepository
const postRepository = new PostRepository();
const userRepository = new UserRepository();

// 2. On crée une instance de PostService en lui passant le PostRepository et une instance d'AuthService en lui passant le UserRepository
const postService = new PostService(postRepository);
const authService = new AuthService();

// 3. On crée une instance de PostController en lui passant le PostService et une instance d'AuthController en lui passant l'AuthService
const postController = new PostController(postService);
const authController = new AuthController();

// 4. On définit les routes et on les lie aux méthodes du PostController
// Test basique pour vérifier que le serveur répond
app.get("/test", (req: Request, res: Response) => {
    res.status(200).json({ message: "Serveur fonctionne!" });
});

// Quand une requête GET est faite à /posts, on appelle la méthode getAllPosts du PostController
app.get("/posts", authMiddleware, (req: Request, res: Response) => {
    console.log("Route GET /posts appelée");
    postController.getAllPosts(req, res);
});

// Quand une requête POST est faite à /posts/create, on appelle pushPost
app.post("/posts/create", authMiddleware, (req: Request, res: Response) => {
    console.log("Route POST /posts/create appelée", req.body);
    postController.pushPost(req, res);
});

// Quand une requête PUT est faite à /posts/:id, on appelle updatePost
app.put("/posts/:id", authMiddleware, (req: Request, res: Response) => {
    console.log(`Route PUT /posts/${req.params.id} appelée`, req.body);
    postController.updatePost(req, res);
});

// Quand une requête DELETE est faite à /posts/:id, on appelle deletePost
app.delete("/posts/:id", authMiddleware, (req: Request, res: Response) => {
    console.log(`Route DELETE /posts/${req.params.id} appelée`);
    postController.deletePost(req, res);
});

// Quand une requete d'inscription est faite a /auth/signup, on appelle signUp
app.post("/auth/signup", (req: Request, res: Response) => {
    console.log("Route POST /auth/signup appelée", req.body);
    authController.signUp(req, res);
});

// Quand une requete de connexion est faite a /auth/signin, on appelle signIn
app.post("/auth/signin", (req: Request, res: Response) => {
    console.log("Route POST /auth/signin appelée", req.body);
    authController.signIn(req, res);
});

// 5. On démarre le serveur sur le port défini dans les variables d'environnement ou 3000 par défaut
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});