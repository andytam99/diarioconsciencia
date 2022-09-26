import { Injectable } from "@angular/core";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { sanityOptions } from "sanity";
import { Article } from "src/app/interfaces/article";
import { Tags } from "src/app/interfaces/tags";
import { Observable, from, of, tap, catchError } from "rxjs";

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
        date, 
        "slug": slug.current,
        tag->{name},
        autor->{name, image}
      }[0...10]`
      )
    ).pipe(
      tap((_) => console.log("fetched")),
      catchError(this.handleError<Article[]>("Error"))
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
      tap((_) => console.log("fetched")),
      catchError(this.handleError<Tags[]>("Error"))
    );
  }

  getBlogsByTags(tag: string): Observable<Article[]> {
    return from(
      this.sanityClientCredentials.option.fetch(`
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
    }`)
    ).pipe(
      tap((_) => console.log("fetched")),
      catchError(this.handleError<Article[]>("Error"))
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
        "slug": slug.current,
        tag->{name},
        autor->{name, image}
    }[0...10]
    `)
    ).pipe(
      tap((_) => console.log("fetched")),
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
      autor->{name, image},
      date,
      "slug": slug.current
    }
    `)
    ).pipe(
      tap((_) => console.log("fetched")),
      catchError(this.handleError<Article[]>("Error"))
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
