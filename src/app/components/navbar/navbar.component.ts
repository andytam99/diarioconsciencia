import { Component, OnInit } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  sequence,
} from "@angular/animations";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  animations: [
    trigger("openClose", [
      state(
        "open",
        style({
          opacity: 1,
          top: "0%",
          right: "0%",
        })
      ),
      state(
        "closed",
        style({
          opacity: 0,
          top: "0%",
          right: "-100%",
        })
      ),
      transition("* => closed", [
        style({ opacity: 0 }),
        animate("0.2s ease-in-out"),
      ]),
      transition("* => open", [animate("0.2s ease-in-out")]),
    ]),
  ],
})
export class NavbarComponent implements OnInit {
  closing: boolean = false;
  menu: boolean = false;

  toggle() {
    const state = this.menu; //save state
    if (!state) this.menu = true; //is closed then open
    this.closing = true;
    setTimeout(() => {
      if (state) this.menu = false; //is open then close
      this.closing = false;
    }, 200);
  }

  constructor() {}

  ngOnInit(): void {}
}
