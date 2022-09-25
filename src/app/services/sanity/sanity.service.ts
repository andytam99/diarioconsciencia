import { Injectable } from "@angular/core";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { sanityOptions } from "sanity";
import { Article } from "src/app/interfaces/article";
import { Tags } from "src/app/interfaces/tags";

@Injectable({
  providedIn: "root",
})
export class SanityService {
  constructor() {}

  sanityClientCredentials = {
    option: sanityClient(sanityOptions),
  };

  urlFor = (source: any) =>
    imageUrlBuilder(this.sanityClientCredentials.option).image(source);

  async getBlogs(): Promise<Article[]> {
    return await this.sanityClientCredentials.option.fetch(
      `*[_type == "blog"] | order(date) {
        _id, 
        title, 
        cover,
        date, 
        "slug": slug.current,
        tag->{name},
        autor->{name, image}
      }[0...10]`
    );
  }

  async getTags(): Promise<Tags[]> {
    return await this.sanityClientCredentials.option.fetch(`
    *[_type == "tag"] {
      name
    }
    `);
  }

  async getBlogsByTags(tag: string) {
    return await this.sanityClientCredentials.option.fetch(`
    *[_type == "tag" && name == "${tag}"] {
      name,
      "related": *[_type == "blog" && references(^._id)] {
        _id, 
        title, 
        cover,
        date, 
        "slug": slug.current,
        tag,
        autor->{name, image}
      }
    }`);
  }

  async getBlogsByTitle(title: string) {
    return await this.sanityClientCredentials.option.fetch(`
    *[_type == "blog" && title match "${title}*"] {
      _id, 
        title, 
        cover,
        date, 
        "slug": slug.current,
        tag->{name},
        autor->{name, image}
    }
    `);
  }

  async getBlog(slug: string): Promise<Article[]> {
    return await this.sanityClientCredentials.option.fetch(`
    *[_type == "blog" && slug.current == "${slug}"] {
      cover,
      title,
      description,
      body,
      autor->{name, image},
      date,
      "slug": slug.current
    }
    `);
  }
}
