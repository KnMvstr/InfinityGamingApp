import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';


const  APIUrlGenreLocal ="http://localhost:8080/api/genre";
const  APIUrlGenreDocker ="http://infinity-spring:8080/api/genre";

const  APIUrlGenre =environment.production ? APIUrlGenreDocker : APIUrlGenreLocal;


@Injectable({
  providedIn: 'root'
})
export class GenreService extends DataService {
  
  constructor(http:HttpClient){
    super(APIUrlGenre,http);
  }
}

