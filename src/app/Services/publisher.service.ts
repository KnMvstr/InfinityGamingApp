import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

const  APIUrlPublisherLocal ="http://localhost:8080/api/publisher";
const  APIUrlPublisherDocker ="http://infinity-spring:8080/api/publisher";

const  APIUrlPublisher =environment.production ? APIUrlPublisherDocker : APIUrlPublisherLocal;


@Injectable({
  providedIn: 'root'
})
export class PublisherService extends DataService{
  constructor(http:HttpClient){
    super(APIUrlPublisher,http)
  }
}
