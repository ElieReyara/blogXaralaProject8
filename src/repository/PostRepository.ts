// On cree la classe PostRepository pour gerer les operations liees aux articles de blog
// Ca nous permettrera d'isoler la logique de la base de donnees du reste de l'application
// Mais aussi de fournir une facon simple d'interagir avec les articles de blog

// 1. Importer le client Supabase et le modele Post
import {supabaseClient} from '../repository/db/supabaseClient'
import {Post, NewPostInput} from '../domain/Post'
import { GetAllPostsResult } from '../generalType';

// 2. Definir la classe PostRepository
export class PostRepository {
  private tableName = 'posts' // Nom de la table dans la base de donnees
  private client = supabaseClient

    // 3. Methode pour recuperer tous les articles de blog
    async getAllPosts(): Promise<GetAllPostsResult> {

        // 3.1 Effectuer la requete pour recuperer tous les articles
        const {data, error} = await this.client
            .from(this.tableName)
            .select('*')

        // 3.2 Gérer les erreurs potentielles
        if (error) {
            console.error('Erreur lors de la récupération des articles depuis la base de données', error);
            return { success: false, error: error.message };
        }
        
        // 3.3 Retourner les articles recuperes ou un tableau vide si aucun article n'est trouve
        return { success: true, data: (data as Post[]) || [] };
    }

    // 4. Methode pour soumettre un article de blog
    async pushPost(newPost : NewPostInput) : Promise<{success: boolean, message: string}> {
        // 4.1 On enregistre l'article dans la DB
        const {data, error} = await supabaseClient 
            .from("posts")
            .insert(newPost)
        if (error) {
            console.error('Erreur lors de l\'enregistrement de l\'article: dans la Base de Donnees', error);
            return { success: false, message: error.message};
        }
        console.log('Article enregistre avec succes dans la base de donnee :', newPost);
        return { success: true, message: 'Article enregistre avec succes'};
    }

    // 5. Methode pour modifier un article de blog
    async updatePost(postId : number, updatedPost : Partial<NewPostInput>) : Promise<{success: boolean, message: string}> {
        // 5.1 On met a jour l'article dans la DB
        const {data, error} = await this.client 
            .from(this.tableName)
            .update(updatedPost)
            .eq('id', postId)
        if (error) {
            console.error('Erreur lors de la mise a jour de l\'article dans la Base de Donnees', error);
            return { success: false, message: error.message};
        }
        console.log('Article mis a jour avec succes dans la base de donnee :', updatedPost);
        return { success: true, message: 'Article mis a jour avec succes'};
    }

    // 6. Methode pour recuperer un article specifique par son ID
    async getPostById(postId : number) : Promise<{success: boolean, data?: Post, message?: string}> {
        // 6.1 On recupere l'article dans la DB
        const {data, error} = await this.client
            .from(this.tableName)
            .select('*')
            .eq('id', postId)
            .single()
        if (error) {
            console.error('Erreur lors de la recuperation de l\'article dans la Base de Donnees', error);
            return { success: false, message: error.message};
        }
        return { success: true, data: data as Post };
    }
}