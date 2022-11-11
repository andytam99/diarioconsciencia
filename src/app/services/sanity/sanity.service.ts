import { Injectable } from "@angular/core";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { sanityOptions } from "sanity";
import { Article } from "src/app/interfaces/article";
import { Tags } from "src/app/interfaces/tags";
import { Observable, from, of, tap, catchError } from "rxjs";
import { Info } from "src/app/interfaces/info";
import { Privacy } from "src/app/interfaces/privacy";
import { Terminos } from "src/app/interfaces/terminos";
import { TagBase } from "src/app/interfaces/tagbase";
import { Post } from "src/app/interfaces/post";

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

  getBlogs(): Observable<Article[]> {
    return from(
      this.sanityClientCredentials.option.fetch(
        `*[_type == "blog"] | order(date) {
        _id, 
        title, 
        cover,
        description,
        date,
        "slug": slug.current,
        tag->{name},
        autor->{name, image}
      }[0...10]`
      )
    ).pipe(
      tap((_) => console.log("fetched Blogs")),
      catchError(this.handleError<Article[]>("Error"))
    );
  }

  getPosts(): Observable<Post[]> {
    return from(
      this.sanityClientCredentials.option.fetch(
        `*[_type == "post"] | order(date) {
        _id, 
        title, 
        description,
        date,
        "slug": slug.current,
        tag->{name},
        autor->{name, image}
      }[0...10]`
      )
    ).pipe(
      tap((_) => console.log("fetched Blogs")),
      catchError(this.handleError<Post[]>("Error"))
    );
  }

  getTags(): Observable<Tags[]> {
    return from(
      this.sanityClientCredentials.option.fetch(`
    *[_type == "tag"] {
      name
    }
    `)
    ).pipe(
      tap((_) => console.log("fetched Tags")),
      catchError(this.handleError<Tags[]>("Error"))
    );
  }

  getBlogsByTags(tag: string): Observable<TagBase> {
    return from(
      this.sanityClientCredentials.option.fetch(`
    *[_type == "tag" && name == "${tag}"] {
      name,
      "blogs": *[_type == "blog" && references(^._id)] {
        _id, 
        title, 
        cover,
        description,
        date, 
        "slug": slug.current,
        tag,
        autor->{name, image}
      }
    }[0]`)
    ).pipe(
      tap((_) => console.log("fetched Blogs by Tags")),
      catchError(this.handleError<TagBase>("Error"))
    );
  }

  getBlogsByTitle(title: string): Observable<Article[]> {
    return from(
      this.sanityClientCredentials.option.fetch(`
    *[_type == "blog" && title match "${title}*"] {
      _id, 
        title, 
        cover,
        date, 
        description,
        "slug": slug.current,
        tag->{name},
        autor->{name, image}
    }[0...10]
    `)
    ).pipe(
      tap((_) => console.log("fetched Blogs by Title")),
      catchError(this.handleError<Article[]>("Error"))
    );
  }

  getBlog(slug: string): Observable<Article[]> {
    return from(
      this.sanityClientCredentials.option.fetch(`
    *[_type == "blog" && slug.current == "${slug}"] {
      cover,
      title,
      description,
      body,
      keywords,
      autor->{name, image},
      date,
      "slug": slug.current
    }
    `)
    ).pipe(
      tap((_) => console.log("fetched Blog")),
      catchError(this.handleError<Article[]>("Error"))
    );
  }

  getPost(slug: string): Observable<Article[]> {
    return from(
      this.sanityClientCredentials.option.fetch(`
    *[_type == "post" && slug.current == "${slug}"] {
      title,
      description,
      keywords,
      autor->{name, image},
      date,
      "slug": slug.current
    }
    `)
    ).pipe(
      tap((_) => console.log("fetched Blog")),
      catchError(this.handleError<Article[]>("Error"))
    );
  }

  getInfo(): Observable<Info> {
    return from(
      this.sanityClientCredentials.option.fetch(`
    *[_type == "info"] {
      body
    }[0]
    `)
    ).pipe(
      tap((_) => console.log("fetched Info")),
      catchError(this.handleError<Info>("Error"))
    );
  }

  getPrivacy(): Observable<Privacy> {
    return from(
      this.sanityClientCredentials.option.fetch(`
    *[_type == "privacidad"] {
      body
    }[0]
    `)
    ).pipe(
      tap((_) => console.log("fetched Privacy")),
      catchError(this.handleError<Privacy>("Error"))
    );
  }

  getTerms(): Observable<Terminos> {
    return from(
      this.sanityClientCredentials.option.fetch(`
    *[_type == "terminos"] {
      body
    }[0]
    `)
    ).pipe(
      tap((_) => console.log("fetched Terms")),
      catchError(this.handleError<Terminos>("Error"))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
