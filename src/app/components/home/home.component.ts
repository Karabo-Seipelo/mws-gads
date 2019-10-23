import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { forkJoin } from 'rxjs'; 
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
  popular;
  upcoming;
  nowPlaying;
  topRated;
  topPicks;
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

  getRequestDataFromMultipleSources(): Observable<any[]> {
      let featuredData = this.movieService.getDiscoverMovie({
        language: 'en-US',
        include_adult: false,
        sort_by: 'popularity.desc'
      });
      let upcomingData = this.movieService.getUpComing();
      let nowPlayingData = this.movieService.getNowPlaying();
      let topRatedData = this.movieService.getTopRated();
      let popularData = this.movieService.getPopular();

      return forkJoin([featuredData, upcomingData, nowPlayingData, topRatedData, popularData])
  }

  ngOnInit() {
    this.getRequestDataFromMultipleSources().subscribe(responseList => {
      this.featured = responseList[0].results.splice(0,1)[0];
      this.featuredList = responseList[0].results.splice(1,4);
      this.upcoming = responseList[1].results;
      this.nowPlaying = responseList[2].results;
      this.topRated = responseList[3].results;
      this.popular = responseList[4].results;
    });
  }
}
