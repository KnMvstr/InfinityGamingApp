import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

const  APIUrlBusinessModelLocal ="http://localhost:8080/api/business";
const  APIUrlBusinessModelDocker ="http://infinity-spring:8080/api/business";

const  APIUrlBusinessModel =environment.production ? APIUrlBusinessModelDocker : APIUrlBusinessModelLocal;

@Injectable({
  providedIn: 'root'
})
export class BusinessModelService extends DataService {
  constructor(http:HttpClient) {
    super(APIUrlBusinessModel,http)
  }
}
