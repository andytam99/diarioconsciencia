import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { InfoComponent } from './pages/info/info.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PrivacidadComponent } from './pages/privacidad/privacidad.component';
import { SearchComponent } from './pages/search/search.component';
import { TerminosComponent } from './pages/terminos/terminos.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
  },
  {
    path: 'blog/:slug',
    component: BlogComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'informacion',
    component: InfoComponent,
  },
  {
    path: 'contacto',
    component: ContactoComponent,
  },
  {
    path: 'privacidad',
    component: PrivacidadComponent,
  },
  {
    path: 'terminos',
    component: TerminosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
