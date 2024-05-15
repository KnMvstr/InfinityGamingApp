import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Game } from '../../Models/game';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchUrl = 'http://localhost:8080/api/game/search'; // adjust depending on your config in Spring Controller

  constructor(private http: HttpClient) {}

  searchGames(term: string): Observable<Game[]> {
    if (!term.trim()) {
      //if not term in query then don't initiate any list elements
      return of([]);
    }
    return this.http.get<Game[]>(`${this.searchUrl}?query=${encodeURIComponent(term)}`).pipe(
      catchError(error => {
        console.error('Error occurred while fetching games:', error);
        return throwError(error);  // Handle or rethrow the error as appropriate
      })
    );
  }
}