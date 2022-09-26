import { Component, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "@sanity/client";
import { toHTML } from "@portabletext/to-html";
import { sanityOptions } from "sanity";

import { SanityService } from "src/app/services/sanity/sanity.service";

import { Article } from "src/app/interfaces/article";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"],
  preserveWhitespaces: true,
})
export class BlogComponent implements AfterViewInit {
  loading: boolean = true;
  blog: Article | undefined = undefined;

  constructor(
    private sanityService: SanityService,
    private route: ActivatedRoute
  ) {}

  sanityClientCredentials = {
    option: sanityClient(sanityOptions),
  };

  urlFor = (source: any) =>
    imageUrlBuilder(this.sanityClientCredentials.option).image(source);

  getBlog(): void {
    const slug = this.route.snapshot.paramMap.get("slug");
    if (!slug) return;
    this.sanityService.getBlog(slug).subscribe((i) => {
      const data = i[0];
      if (typeof data.body === "string") return;
      const body = toHTML(data.body);
      data.body = body;
      this.blog = data;
      this.loading = false;
    });
  }

  ngAfterViewInit(): void {
    this.getBlog();
  }
}
