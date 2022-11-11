import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Post } from "src/app/interfaces/post";
import { SanityService } from "src/app/services/sanity/sanity.service";

@Component({
  selector: "app-inpost",
  templateUrl: "./inpost.component.html",
  styleUrls: ["./inpost.component.scss"],
})
export class InpostComponent implements OnInit {
  loading: boolean = true;
  post: Post | undefined = undefined;

  constructor(
    private sanityService: SanityService,
    private route: ActivatedRoute,
    private meta: Meta
  ) {}

  getPost(): void {
    const slug = this.route.snapshot.paramMap.get("slug");
    if (!slug) return;
    this.sanityService.getPost(slug).subscribe((i) => {
      const data = i[0];
      this.post = data;
      this.loading = false;
      this.meta.addTags([
        { name: "title", content: this.post.title },
        { name: "keywords", content: this.post.keywords.join(", ") },
        { name: "description", content: this.post.description },
      ]);
    });
  }

  ngOnInit(): void {
    this.getPost();
  }
}
