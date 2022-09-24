import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { BlogsMock } from 'src/app/mocks/blogs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  blogs: Article[] = BlogsMock

  constructor() {}

  ngOnInit(): void {}
}
