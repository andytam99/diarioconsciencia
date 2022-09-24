import { Component, Input, OnInit } from "@angular/core";
import { Article } from "src/app/interfaces/article";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() blog: Article = {
    title: "Lorem ipsum",
    body: "",
    autor: "John Doe",
    tag: "Lorem",
    image: "https://picsum.photos/1440/1440",
    href: 'lorem-ipsum'
  };

  constructor() {}

  ngOnInit(): void {}
}
