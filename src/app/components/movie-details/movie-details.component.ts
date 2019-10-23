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
  cast;
  crew;
  getImage =  (image) => {
    const myStyles = {
       'background-image': `url(${this.movieService.getImage(image)})`
    };
    return myStyles;
  }

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
  ) { }

  getMovie(id) {
    this.movieService.getMovie(id).subscribe(movie => {
      this.movie = movie;
    });
  }

  getCredits(id) {
    this.movieService.getCredits(id).subscribe(credits => {
      this.cast = credits.cast;
      this.crew = credits.crew;
    });
  }

  getVideos(id) {
    this.movieService.getMovie(id).subscribe(movie => {
      const key = movie.results[0].key;
    });
  }

  getRequestDataFromMultipleSources(id): Observable<any[]> {

    let movieData = this.movieService.getMovie(id);
    let crewData = this.movieService.getCredits(id)
    
    return forkJoin([movieData, crewData]);
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.getRequestDataFromMultipleSources(id).subscribe(responseList => {
        this.movie = responseList[0];
        this.cast = responseList[1].cast
        this.crew = responseList[1].crew
      })
    });
  }

}
