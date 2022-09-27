import { Article } from "./article";

export interface TagBase {
    name: string;
    blogs: Article[]
}