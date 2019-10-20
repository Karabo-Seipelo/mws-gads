import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    MovieService
  ]
})
export class HomeComponent  implements OnInit {
  title = 'mws-gads';
  currentPage;
  totalPages;
  totalResults;
  movies;
  getImage =  (image) => {
    const myStyles = {
       'background-image': `url(${this.movieService.getImage(image)})`
    };
    return myStyles;
  }

  constructor(
    private movieService: MovieService
  ) {}

  getDiscoverMovie() {
    this.movieService.getDiscoverMovie().subscribe(movies => {
      this.currentPage = movies.page;
      this.totalPages = movies.total_pages;
      this.totalResults = movies.total_results;
      this.movies = movies.results;
    });
  }

  ngOnInit() {
    this.getDiscoverMovie();
  }
}