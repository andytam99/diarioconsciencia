import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InpostComponent } from "./pages/inpost/inpost.component";
import { BlogComponent } from "./pages/blog/blog.component";
import { InfoComponent } from "./pages/info/info.component";
import { InicioComponent } from "./pages/inicio/inicio.component";
import { PrivacidadComponent } from "./pages/privacidad/privacidad.component";
import { SearchComponent } from "./pages/search/search.component";
import { TagsComponent } from "./pages/tags/tags.component";
import { TerminosComponent } from "./pages/terminos/terminos.component";

const routes: Routes = [
  {
    path: "",
    component: InicioComponent,
  },
  {
    path: "blog/:slug",
    component: BlogComponent,
  },
  {
    path: "post/:slug",
    component: InpostComponent,
  },
  {
    path: "search",
    component: SearchComponent,
  },
  {
    path: "tags/:tag",
    component: TagsComponent,
  },
  {
    path: "informacion",
    component: InfoComponent,
  },
  {
    path: "privacidad",
    component: PrivacidadComponent,
  },
  {
    path: "terminos",
    component: TerminosComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: "enabledBlocking",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
