import { Component, OnInit } from '@angular/core';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    MovieService
  ]
})
export class AppComponent  implements OnInit {
  title = 'mws-gads';
  movies;

  constructor(
    private movieService: MovieService
  ) {}

  getDiscoverMovie() {
    this.movieService.getDiscoverMovie().subscribe(movies => this.movies = movies);
  }

  ngOnInit() {
    this.getDiscoverMovie();
    console.log('testing')
  }
}
