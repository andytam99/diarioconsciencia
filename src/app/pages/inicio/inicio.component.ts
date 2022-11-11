import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from "@angular/core";
import { Article } from "src/app/interfaces/article";
import { SanityService } from "src/app/services/sanity/sanity.service";

import { Observable, of } from "rxjs";

import { BlogsMock } from "src/app/mocks/blogs";
import { Post } from "src/app/interfaces/post";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.scss"],
})
export class InicioComponent implements OnInit {
  blogs: Article[] = [];
  posts: Post[] = [];
  content: any[] = [];

  imageUrl(source: any) {
    return this.sanityService.urlFor(source);
  }

  getContent(): void {
    this.sanityService.getBlogs().subscribe((blogs) => {
      this.blogs = blogs;
      this.sanityService.getPosts().subscribe((posts) => {
        this.posts = posts;
        const mix = [...this.blogs, ...this.posts].sort(
          (a, b) => new Date(a.date).getDate() - new Date(b.date).getDate()
        );
        this.content = mix;
        console.log(mix);
      });
    });
  }

  constructor(private sanityService: SanityService) {}

  ngOnInit(): void {
    this.getContent();
  }
}
