// On implemente le service PostService pour gerer la logique metier liee aux articles de blog
// Cela nous permet de separer la logique metier de la logique d'acces aux donnees
// Et de fournir une interface simple pour interagir avec les articles de blog
// 1. Importer le PostRepository et le modele Post
import { PostRepository } from "../repository/PostRepository";
import { Post, NewPostInput } from "../domain/Post";
import { GetAllPostsResult } from "../generalType";


// 2. Definir la classe PostService
export class PostService{
    // Je defini une propriee private pour stocker une instance de PostRepository
    private readonly postRepository: PostRepository;

    // 3. Je stocke l'instance de PostRepository dans le constructeur
    constructor(postRepository: PostRepository){
        this.postRepository = postRepository;
    }
    
    // !METHODE CLASS

    // 4. Methode pour recuperer tous les articles de blog(Logique metier)
    async getAllPosts() : Promise<GetAllPostsResult>{
        // 4.1 J'appelle la methode getAllPosts du PostRepository pour recuperer les articles
        return this.postRepository.getAllPosts();
    }

    // 5. Methode pour enregistrer(creer) un nouvel article
    async pushPost(newPost : NewPostInput) : Promise<{success: boolean, message: string}>{
        // 5.1 Logique metier ou check des infos avant de creer l'article
        // Je verifie que le titre et le contenu ne sont pas vides
        if(!newPost.title.trim() || !newPost.content.trim()){
            return {success: false, message: "Le titre et le contenu sont obligatoires."};
        }
        // 5.2 J'appelle la methode pour creer l'article
        return this.postRepository.pushPost(newPost);
    }


}