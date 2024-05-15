import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

const APIUrlReviewLocal = "http://localhost:8080/api/review";
const APIUrlReviewDocker = "http://infinity-spring:8080/api/review";

const  APIUrlReview =environment.production ? APIUrlReviewDocker : APIUrlReviewLocal;

@Injectable({
  providedIn: 'root'
})
export class ReviewService extends DataService {
  constructor(http:HttpClient){
    super(APIUrlReview,http);  
  }
  
  
}
