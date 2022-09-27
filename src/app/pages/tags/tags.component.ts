import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Article } from "src/app/interfaces/article";
import { SanityService } from "src/app/services/sanity/sanity.service";

@Component({
  selector: "app-tags",
  templateUrl: "./tags.component.html",
  styleUrls: ["./tags.component.scss"],
})
export class TagsComponent implements OnInit {
  loading = true;
  tags: { name: string; blogs: Article[] } = { name: "", blogs: [] };

  getBlogsByTags(): void {
    const tag = this.route.snapshot.paramMap.get("tag");
    if (!tag) return;
    this.sanityService.getBlogsByTags(tag).subscribe((i) => {
      this.tags = i;
      this.loading = false;
    });
  }

  constructor(
    private sanityService: SanityService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getBlogsByTags();
  }
}
