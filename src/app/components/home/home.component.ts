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
    this.movieService.getDiscoverMovie({
      language: 'en-US',
      include_adult: false,
      sort_by: 'popularity.desc'
    }).subscribe(movies => {
      this.currentPage = movies.page;
      this.totalPages = movies.total_pages;
      this.totalResults = movies.total_results;
      this.movies = movies.results;
    });
  }

  getNext() {
    const NextPage = this.currentPage < this.totalPages ? this.currentPage + 1 : this.currentPage;
    this.movieService.getDiscoverMovie({
      language: 'en-US',
      include_adult: false,
      sort_by: 'popularity.desc',
      page: NextPage
    }).subscribe(movies => {
      this.movies = movies.results;
      this.currentPage = movies.page;
      console.log('page: ', this.currentPage);
    });
  }

  getPrevious() {
    const PreviousPage = this.currentPage === 1 ? this.currentPage : this.currentPage - 1;
    this.movieService.getDiscoverMovie({
      language: 'en-US',
      include_adult: false,
      sort_by: 'popularity.desc',
      page: PreviousPage
    }).subscribe(movies => {
      this.movies = movies.results;
      this.currentPage = movies.page;
      console.log('page: ', this.currentPage);
    });
  }

  ngOnInit() {
    this.getDiscoverMovie();
  }
}
