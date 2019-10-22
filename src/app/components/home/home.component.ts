import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import _ from 'lodash';

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
  featured;
  featuredList;

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

      if (movies.page === 1) {
        this.featured = movies.results.splice(0,1)[0];
        this.featuredList = movies.results.splice(0,4);
        this.movies = movies.results;
      } else {
        this.movies = movies.results;
      }
    });
  }

  getNext() {
    const NextPage = this.currentPage < this.totalPages ? this.currentPage + 1 : this.currentPage;
    if (this.currentPage >= 1) {

      this.movieService.getDiscoverMovie({
        language: 'en-US',
        include_adult: false,
        sort_by: 'popularity.desc',
        page: NextPage
      }).subscribe(movies => {
        this.currentPage = movies.page;
  
        if (movies.page === 1) {
          this.featured = movies.results.splice(0,1);
          this.featuredList = movies.results.splice(0,4);
          this.movies = movies.results;
        } else {
          this.movies = movies.results;
        }
  
      });
    }
  }

  getPrevious() {
    const PreviousPage = this.currentPage === 1 ? this.currentPage : this.currentPage - 1;

    if (this.currentPage > 1) {
      this.movieService.getDiscoverMovie({
        language: 'en-US',
        include_adult: false,
        sort_by: 'popularity.desc',
        page: PreviousPage
      }).subscribe(movies => {

        this.currentPage = movies.page;
        if (movies.page === 1) {
          this.featured = movies.results.splice(0,1);
          this.featuredList = movies.results.splice(0,4);
          this.movies = movies.results;
        } else {
          this.movies = movies.results;
        }
      });
    }
  }

  ngOnInit() {
    this.getDiscoverMovie();
  }
}
