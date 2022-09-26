import { Component, OnInit } from "@angular/core";
import { Article } from "src/app/interfaces/article";
import { SanityService } from "src/app/services/sanity/sanity.service";

import { Observable, of } from "rxjs";

import { BlogsMock } from "src/app/mocks/blogs";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.scss"],
})
export class InicioComponent implements OnInit {
  blogs: Article[] = [];

  imageUrl(source: any) {
    return this.sanityService.urlFor(source);
  }

  getBlogs(): void {
    this.sanityService.getBlogs().subscribe((blogs) => (this.blogs = blogs));
  }

  constructor(private sanityService: SanityService) {}

  ngOnInit(): void {
    this.getBlogs();
  }
}
