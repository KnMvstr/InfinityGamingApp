import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';


const  APIUrlPlatformLocal  ="http://localhost:8080/api/platform";
const  APIUrlPlatformDocker ="http://infinity-spring:8080/api/platform";

const  APIUrlPlatform =environment.production ? APIUrlPlatformDocker : APIUrlPlatformLocal;


@Injectable({
  providedIn: 'root'
})
export class PlatformService extends DataService {

  constructor(http:HttpClient){
    super(APIUrlPlatform,http);
  }
}
