import { Entry } from 'contentful';
import { Autor } from './autor';
import { imageFile } from './contentful/imageFile';

type heroImage = {
  description: string;
  file: imageFile;
  title: string;
};

export interface Article {
  cover: string;
  title: string;
  description: string;
  body: string;
  slug: string;
  tag: string;
  autor: Autor;
  date: string;
}
