import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Article } from "src/app/interfaces/article";
import { SanityService } from "src/app/services/sanity/sanity.service";
import { filter } from "rxjs";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  blogs: Article[] = [];

  imageUrl(source: any) {
    return this.sanityService.urlFor(source);
  }

  getBlogsByTitle(): void {
    this.route.queryParamMap.subscribe((params) => {
      const title = params.get("title");
      if (!title) return;
      this.sanityService.getBlogsByTitle(title).subscribe((i) => {
        this.blogs = i;
      });
    });
  }

  constructor(
    private sanityService: SanityService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getBlogsByTitle();
  }
}
