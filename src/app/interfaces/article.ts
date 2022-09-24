import { Entry } from 'contentful';
import { imageFile } from './contentful/imageFile';

type heroImage = {
  description: string;
  file: imageFile;
  title: string;
};

export interface Article {
  image: string;
  title: string;
  body: string;
  tag: string;
  autor: string;
  href: string;
}
