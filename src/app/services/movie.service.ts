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

  private _query(options?) {
    const { API_KEY, LANGUAGE } = environment;
    let option;
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

  getImage(options) {
    const { IMAGES_URI } = environment;
    return `${IMAGES_URI}/${options.size}/${options.file}`;
  }

  getPopular(options): Observable<any> {
    const { API_URI } = environment;
    return this.http.get<any>(`${API_URI}movie/popular${this._query(options)}`);
  }

  getMovie(id): Observable<any> {
    const { API_URI } = environment;
    return this.http.get<any>(`${API_URI}movie/${id}${this._query()}`);
  }

  getSimilarMovies(id): Observable<any> {
    const { API_URI } = environment;
    return this.http.get<any>(`${API_URI}movie/${id}/similar${this._query()}`);
  }

  getLatestMovies(): Observable<any> {
    const { API_URI } = environment;
    return this.http.get<any>(`${API_URI}movie/latest${this._query()}`);
  }

  getDiscoverMovie(): Observable<any> {
    const { API_URI} = environment;
    return this.http.get<any>(`${API_URI}discover/movie${this._query()}`);
  }

  getMovieGenres(): Observable<any> {
    const { API_URI} = environment;
    return this.http.get<any>(`${API_URI}genre/movie/list${this._query()}`);
  }
}
