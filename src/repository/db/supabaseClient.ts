//Nous etablissons la connexion a la base de donnees Supabase
// 1. Importer les fonctions necessaires depuis le SDK Supabase
import {createClient} from '@supabase/supabase-js'
import dotvenv from 'dotenv'

// 2. Charger les variables d'environnement depuis le fichier .env
dotvenv.config()

// 3. Recuperer l'URL et les cles de la base de donnees depuis les variables d'environnement
const SUPABASE_URL = process.env.SUPABASE_URL as string
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY as string

// Vérification minimale des variables essentielles
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Les variables d'environnement SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY doivent être définies");
}

// Client admin (utilise la service_role key) — contourne RLS, à n'utiliser que côté serveur
export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

