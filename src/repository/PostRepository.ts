// On cree la classe PostRepository pour gerer les operations liees aux articles de blog
// Ca nous permettrera d'isoler la logique de la base de donnees du reste de l'application
// Mais aussi de fournir une facon simple d'interagir avec les articles de blog

// 1. Importer le client Supabase et le modele Post
import {supabaseClient} from '../repository/db/supabaseClient'
import {Post, NewPostInput} from '../domain/Post'

// 2. Definir la classe PostRepository
export class PostRepository {
  private tableName = 'posts' // Nom de la table dans la base de donnees
  private client = supabaseClient

    // 3. Methode pour recuperer tous les articles de blog
    async getAllPosts(): Promise<Post[]> {

        // 3.1 Effectuer la requete pour recuperer tous les articles
        const {data, error} = await supabaseClient
            .from("posts")
            .select('*')

        // 3.2 Gérer les erreurs potentielles
        if (error) {
            console.error('Erreur lors de la récupération des articles:', error);
            throw new Error(error.message)
        }
        
        // 3.3 Retourner les articles recuperes ou un tableau vide si aucun article n'est trouve
        return (data as Post[]) || []
    }

    // 4. Methode pour soumettre un article de blog
    async pushPost(newPost : NewPostInput){
        // 4.1 On enregistre l'article dans la DB
        const {data, error} = await supabaseClient 
            .from("posts")
            .insert(newPost)

        // 4.2 En cas d'erreur
        if (error) {
            console.error('Erreur lors de l\'enregistrement de l\'article dans la base de donnee:', error);
            throw new Error(error.message)
        }

    }
}