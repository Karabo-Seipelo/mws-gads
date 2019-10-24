import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-movie-detail-feed',
  templateUrl: './movie-detail-feed.component.html',
  styleUrls: ['./movie-detail-feed.component.scss']
})
export class MovieDetailFeedComponent implements OnInit {
  @Input() feed: any;

  constructor(
    private movieService: MovieService,
  ) { }

  getImage =  (image) => {
    const myStyles = {
       'background-image': `url(${this.movieService.getImage(image)})`
    };
    return myStyles;
  }

  ngOnInit() {
    console.log(this.feed);
  }

}
