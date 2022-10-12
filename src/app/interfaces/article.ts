import type {
  ArbitraryTypedObject,
  PortableTextBlock,
} from "@portabletext/types";

import { Autor } from "./autor";
import { Tags } from "./tags";

export interface Article {
  cover: string;
  title: string;
  description: string;
  body: string | ArbitraryTypedObject | PortableTextBlock;
  slug: string;
  tag: Tags;
  keywords: string[];
  autor: Autor;
  date: string;
}
