import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { BlogsMock } from 'src/app/mocks/blogs';
import { SanityService } from 'src/app/services/sanity/sanity.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  blogs: Article[] = []

  imageUrl(source: any) {
    return this.sanityService.urlFor(source);
  }

  async getBlogs(): Promise<Article[]>  {
    this.blogs = await this.sanityService.getBlogs();
    // console.log(this.blogs)
    return this.blogs;
  }

  constructor(private sanityService: SanityService ) {}

  ngOnInit(): void {
    this.getBlogs();
  }

}
