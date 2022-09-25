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
  @Input() blog: Article | undefined = undefined;

  sanityClientCredentials = {
    option: sanityClient(sanityOptions),
  };

  urlFor = (source: any) =>
    imageUrlBuilder(this.sanityClientCredentials.option).image(source);

  constructor() {}

  ngOnInit(): void {}
}
