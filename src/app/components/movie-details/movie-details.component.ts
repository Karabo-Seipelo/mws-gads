import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs'; 

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie;
  casts;
  castSeeAll = false;
  crews;
  crewSeeAll = false;
  similarMovies;
  similarMoviesSeeAll = false;

  seeMore = (value) => {
    console.log('click: ', !value);
    return value = !value;
  };

  getImage =  (image) => {
    const myStyles = {
       'background-image': `url(${this.movieService.getImage(image)})`
    };
    return myStyles;
  }

  getImageUrl = (image) => this.movieService.getImage(image);

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
  ) { }

  getVideos(id) {
    this.movieService.getMovie(id).subscribe(movie => {
      const key = movie.results[0].key;
    });
  }

  getRequestDataFromMultipleSources(id): Observable<any[]> {

    const movieData = this.movieService.getMovie(id);
    const crewData = this.movieService.getCredits(id);
    const similarData = this.movieService.getSimilarMovies(id);

    return forkJoin([movieData, crewData, similarData]);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.getRequestDataFromMultipleSources(id).subscribe(responseList => {
        this.movie = responseList[0];
        this.casts = responseList[1].cast;
        this.crews = responseList[1].crew;
        this.similarMovies = responseList[2].results;
      });
    });
  }

}
