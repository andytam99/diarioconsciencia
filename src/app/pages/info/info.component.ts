import { AfterViewInit, Component, OnInit } from "@angular/core";
import { toHTML } from "@portabletext/to-html";
import { Info } from "src/app/interfaces/info";
import { SanityService } from "src/app/services/sanity/sanity.service";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"],
})
export class InfoComponent implements OnInit {
  info: Info = { body: "" };
  loading: boolean = true;

  constructor(private sanityService: SanityService) {}

  getInfo(): void {
    this.sanityService.getInfo().subscribe((i) => {
      if (typeof i.body === "string") return;
      this.info = { body: toHTML(i.body) };
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.getInfo();
  }
}
