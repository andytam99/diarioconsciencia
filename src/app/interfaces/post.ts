import { Autor } from "./autor";
import { Tags } from "./tags";

export interface Post {
  title: string;
  description: string;
  slug: string;
  tag: Tags;
  keywords: string[];
  autor: Autor;
  date: string;
}
