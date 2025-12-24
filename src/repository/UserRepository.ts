import {supabaseClient} from '../repository/db/supabaseClient';


export class UserRepository{
    private supabase = supabaseClient;

    async createUserProfile(userId: string, username: string) {
        // La ligne etant creere lors de l'inscription, on met juste a jour le username
        const {data, error} = await this.supabase
            .from('usersProfile')
            .update({username: username})
            .eq('id', userId);

        if (error) throw error;
        if (!data) throw new Error('Profil utilisateur non trouvé');

        return data;
    }

    async signUp(email: string, password: string) {
        const {data, error} = await this.supabase.auth.signUp({
            email,
            password
        });

        if (error) throw error;
        if (!data || !data.user) throw new Error('Aucun utilisateur créé lors du sign-up');

        return data;
    }


    async signIn(email: string, password: string) {
        const {data, error} = await this.supabase.auth.signInWithPassword({
            email,
            password
        });
        
        if (error) throw error;
        if (!data || !data.user) throw new Error('Aucun utilisateur trouvé lors de la connexion');
        
        return data;
    }
}