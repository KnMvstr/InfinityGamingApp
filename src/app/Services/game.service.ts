import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { Review } from '../Models/review';

const  APIUrlGameLocal  ="http://localhost:8080/api/game";
const  APIUrlGameDocker ="http://infinity-spring:8080/api/game";

const  APIUrlGame =environment.production ? APIUrlGameDocker : APIUrlGameLocal;

@Injectable({
  providedIn: 'root'
})
export class GameService extends DataService{

  constructor(http:HttpClient) {
    super(APIUrlGame,http)
   }
   
   getGameReviews(gameId: number): Observable<Review[]> {
    return this.getReviewByGameId(gameId);
  }
}


