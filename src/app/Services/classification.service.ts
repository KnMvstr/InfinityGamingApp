import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

const APIUrlClassificationLocal = "http://localhost:8080/api/classification"
const APIUrlClassificationDocker = "http://infinity-spring:8080/api/classification"

const APIUrlClassification = environment.production ? APIUrlClassificationDocker : APIUrlClassificationLocal;

@Injectable({
  providedIn: 'root'
})
export class ClassificationService extends DataService{

  constructor(http:HttpClient) {
    super(APIUrlClassification,http);
  }
}
