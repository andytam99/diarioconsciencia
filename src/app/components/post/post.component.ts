import { Component, Input, OnInit } from "@angular/core";
import sanityClient from "@sanity/client";
import { Article } from "src/app/interfaces/article";
import imageUrlBuilder from "@sanity/image-url";
import { sanityOptions } from "sanity";
import { Post } from "src/app/interfaces/post";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit {
  @Input() post: Post | undefined = undefined;

  sanityClientCredentials = {
    option: sanityClient(sanityOptions),
  };

  constructor() {}

  ngOnInit(): void {}
}
