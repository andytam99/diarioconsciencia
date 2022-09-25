import { Component, OnInit } from "@angular/core";
import { Tags } from "src/app/interfaces/tags";
import { SanityService } from "src/app/services/sanity/sanity.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  tags: Tags[] = []

  async getTags() {
    this.tags = await this.sanityService.getTags();
    return this.tags
  }

  constructor(private sanityService: SanityService) {}

  ngOnInit(): void {
    this.getTags()
  }
}
