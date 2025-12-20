// Je cree des types generaux pour les articles de blog

import { Post } from "./domain/Post";

// 1. Definir le type Post pour representer un article de blog
// data est en type any car les donnes peuvent etre soit Post[] soit un tableau vide
export type GetAllPostsResult =
  | { success: true; data: any }
  | { success: false; error: string };