import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import YouTubeIframeLoader from 'youtube-iframe';;

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
      
      YouTubeIframeLoader.load((YT) => {
        new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: key
        })
      });

    })
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.getMovie(id);
      this.getCredits(id);
    });


  }

}
