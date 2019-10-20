import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie;
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

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.getMovie(id);
    });
  }

}
