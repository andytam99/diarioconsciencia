import { Component, Input, OnInit } from "@angular/core";
import sanityClient from "@sanity/client";
import { Article } from "src/app/interfaces/article";
import imageUrlBuilder from "@sanity/image-url";
import { sanityOptions } from "sanity";



@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() blog: Article = {
    title: "Lorem ipsum",
    body: "",
    autor: { name: "John Doe", image: "https://picsum.photos/600/600" },
    tag: "Lorem",
    cover: "https://picsum.photos/1440/1440",
    slug: "lorem-ipsum",
    description: "",
    date: "2022-09-25T00:18:45.263Z",
  };

  sanityClientCredentials = {
    option: sanityClient(sanityOptions),
  };

  urlFor = (source: any) =>
    imageUrlBuilder(this.sanityClientCredentials.option).image(source);

  constructor() {}

  ngOnInit(): void {}
}
