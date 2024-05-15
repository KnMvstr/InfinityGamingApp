import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user';
import { Observable } from 'rxjs';

const  APIUrlUserLocal ="http://localhost:8080/api/user";
const  APIUrlUserDocker ="http://infinity-spring:8080/api/user";

const  APIUrlUser =environment.production ? APIUrlUserDocker : APIUrlUserLocal;

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService {
  constructor(http:HttpClient){
    super(APIUrlUser,http);  
  }
  findByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${APIUrlUser}/by_email/${email}`); // Utilisation de APIUrlUser sans this
  } 
  
}
