//Nous etablissons la connexion a la base de donnees Supabase
// 1. Importer les fonctions necessaires depuis le SDK Supabase
import {createClient} from '@supabase/supabase-js'
import dotvenv from 'dotenv'

// 2. Charger les variables d'environnement depuis le fichier .env
dotvenv.config()

// 3. Recuperer l'URL et la cle de la base de donnees depuis les variables d'environnement
const SUPABASE_URL = process.env.SUPABASE_URL as string
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY as string

// Micro optimization: Nous pourrions verifier si les variables sont definies et lancer une erreur si ce n'est pas le cas
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Les variables d'environnement SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY doivent être définies");
}

// 4. Creer une instance du client Supabase en utilisant l'URL et la cle
export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)