import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpClient
  ) { }

  private _query(options?: {}) {
    const { API_KEY, LANGUAGE } = environment;
    let option: string;
    let query = `?api_key=${API_KEY}&language=${LANGUAGE}`;
    const _OPTIONS = options || {};

    if (Object.keys(_OPTIONS).length > 0) {
      for (option in _OPTIONS) {
        if (_OPTIONS.hasOwnProperty(option) && option !== 'id' && option !== 'body') {
          query = `${query}&${option}=${_OPTIONS[option]}`;
        }
      }
    }

    return query;
  }

  getImage(options: { size: any; file: any; }) {
    const { IMAGES_URI } = environment;
    return `${IMAGES_URI}/${options.size}/${options.file}`;
  }

  getPopular(options: any): Observable<any> {
    const { API_URI } = environment;
    return this.http.get<any>(`${API_URI}movie/popular${this._query(options)}`);
  }

  getMovie(id: any): Observable<any> {
    const { API_URI } = environment;
    return this.http.get<any>(`${API_URI}movie/${id}${this._query()}`);
  }

  getSimilarMovies(id: any): Observable<any> {
    const { API_URI } = environment;
    return this.http.get<any>(`${API_URI}movie/${id}/similar${this._query()}`);
  }

  getLatestMovies(): Observable<any> {
    const { API_URI } = environment;
    return this.http.get<any>(`${API_URI}movie/latest${this._query()}`);
  }

  getDiscoverMovie(options): Observable<any> {
    const { API_URI} = environment;
    return this.http.get<any>(`${API_URI}discover/movie${this._query(options)}`);
  }

  getMovieGenres(): Observable<any> {
    const { API_URI} = environment;
    return this.http.get<any>(`${API_URI}genre/movie/list${this._query()}`);
  }

  getVideos(id): Observable<any> {
    const { API_URI} = environment;
    return this.http.get<any>(`${API_URI}movie/${id}${this._query()}`);
  }

  getCredits(id): Observable<any> {
    const { API_URI} = environment;
    return this.http.get<any>(`${API_URI}movie/${id}/credits${this._query()}`);
  }

  getRecommendations(id):  Observable<any> {
    const { API_URI} = environment;
    return this.http.get<any>(`${API_URI}movie/${id}/recommendations${this._query()}`);
  }

  getNowPlaying(): Observable<any> {
    const { API_URI} = environment;
    return this.http.get<any>(`${API_URI}movie/now_playing${this._query()}`);
  }

  getTopRated(): Observable<any> {
    const { API_URI} = environment;
    return this.http.get<any>(`${API_URI}movie/top_rated${this._query()}`);
  }

  getUpComing(): Observable<any> {
    const { API_URI} = environment;
    return this.http.get<any>(`${API_URI}movie/upcoming${this._query()}`);
  }

}
