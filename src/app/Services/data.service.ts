import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../Models/review';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  // Inject ApiUrl in constructor to Get it fromm other Service
  constructor(@Inject(String) private APIUrl: string, protected http: HttpClient) { }


  // Get Method
  getAll(): Observable<any> {
    return this.http.get<any>(this.APIUrl);
  }


  // Get with id
  get(id: any): Observable<any> {
    return this.http.get(`${this.APIUrl}/${id}`);
  }
  // Update Method
  Update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.APIUrl}/edit/${id}`, data);
  }


  // Create Method
  create(user: any) {
    return this.http.post(`${this.APIUrl}/create`, user);
  }


  // Delete Method
  Delete(id: any): Observable<any> {
    return this.http.delete(`${this.APIUrl}/delete/${id}`);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.APIUrl}/create`, userData);
  }

  // Get Sorted
  /*getSortedByField(field: string): Observable<any> {
    return this.http.get<any>(`${this.APIUrl}/sorted`, { params: { field } });
  }*/

  // Get sorted toggle enable
  getSortedByFieldAndDirection(field: string, direction: 'asc' | 'desc'): Observable<any> {
    return this.http.get<any>(`${this.APIUrl}/sorted`, { params: { field, direction } });
  }

  getReviewByGameId(gameId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.APIUrl}/by_game/${gameId}`);
  }

  getCount(): Observable<number> {
    return this.http.get<number>(`${this.APIUrl}/count`);
  }

 
}
