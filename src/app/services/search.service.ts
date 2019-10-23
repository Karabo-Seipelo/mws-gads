import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

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


  searchMovies (query: string): Observable<any> {
    const { API_URI } = environment;
    return this.http.get<any>(`${API_URI}search/movie${this._query()}&query=${query}`);
  }

  searchPeople (query: string): Observable<any> {
    const { API_URI } = environment;
    return this.http.get<any>(`${API_URI}search/person${this._query()}&query=${query}`);
  }

  searchCompanies (query: string): Observable<any> {
    const { API_URI } = environment;
    return this.http.get<any>(`${API_URI}search/company${this._query()}&query=${query}`);
  }
}
