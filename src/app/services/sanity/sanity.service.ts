import { Injectable } from "@angular/core";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { sanityOptions } from "sanity";
import { Article } from "src/app/interfaces/article";
import { Blogs } from "src/app/interfaces/blogs";

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
        slug,
        tag,
        autor->{name, image}
      }[0...10]`
    );
  }
}
