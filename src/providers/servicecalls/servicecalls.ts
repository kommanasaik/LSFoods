import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import *  as AppConfig from '../../app/serverCalls';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/*
  Generated class for the ServicecallsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicecallsProvider {
  cfg: any;

  constructor(public http: HttpClient) {
    this.cfg = AppConfig.cfg;

  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
    })
  };
  public checkNumber(data):Observable<any>{
    return this.http.post('http://bashaproducts.co.in/api/User/CheckLogin',JSON.stringify(data),this.httpOptions).pipe(
      map(res=>res));
  }
  
 
}
