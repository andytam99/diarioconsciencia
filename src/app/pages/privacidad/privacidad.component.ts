import { Component, OnInit } from "@angular/core";
import { toHTML } from "@portabletext/to-html";
import { Privacy } from "src/app/interfaces/privacy";
import { SanityService } from "src/app/services/sanity/sanity.service";

@Component({
  selector: "app-privacidad",
  templateUrl: "./privacidad.component.html",
  styleUrls: ["./privacidad.component.scss"],
})
export class PrivacidadComponent implements OnInit {
  
  data: Privacy = { body: "" };
  loading: boolean = true;

  constructor(private sanityService: SanityService) {}

  getInfo(): void {
    this.sanityService.getPrivacy().subscribe((i) => {
      if (typeof i.body === "string") return;
      this.data = { body: toHTML(i.body) };
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.getInfo();
  }
  
}
