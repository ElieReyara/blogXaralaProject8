// Nous allons definir le modele Post pour representer les articles de blog
// Cela nous permettra d'avoir une structure claire pour les articles
// 1. Definir l'interface Post avec les proprietes necessaires
export interface Post {
  id: number
  title: string
  content: string
  author: string
  likes_count: number
  author_id: number
  publication_date: Date
}

// Les elements necessaires pour creer un article de blog
export interface NewPostInput{
    title: string
    content: string
    author: string
}
