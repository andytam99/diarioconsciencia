import { Component, OnInit } from "@angular/core";
import { toHTML } from "@portabletext/to-html";
import { Terminos } from "src/app/interfaces/terminos";
import { SanityService } from "src/app/services/sanity/sanity.service";

@Component({
  selector: "app-terminos",
  templateUrl: "./terminos.component.html",
  styleUrls: ["./terminos.component.scss"],
})
export class TerminosComponent implements OnInit {
  data: Terminos = { body: "" };
  loading: boolean = true;

  constructor(private sanityService: SanityService) {}

  getInfo(): void {
    this.sanityService.getTerms().subscribe((i) => {
      if (typeof i.body === "string") return;
      this.data = { body: toHTML(i.body) };
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.getInfo();
  }
}
