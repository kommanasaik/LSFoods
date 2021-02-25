import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import *  as AppConfig from '../../app/serverCalls';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Provider for services
*/
@Injectable()

/**
 * Manages all methods 
 */
export class AuthServiceProvider {

  /**
* Value of the header cfg
*/
  cfg: any;

  /**
*  loads first when entering to the page 
*/
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
  public RegisterDetails(data):Observable<any>{
    return this.http.post(this.cfg.api+'/user/createuser',(data),this.httpOptions).pipe(
      map(res=>res));
  }
  public CheckUserLogin(data):Observable<any>{
    return this.http.post(this.cfg.api+'/user/Login',JSON.stringify(data),this.httpOptions).pipe(
      map(res=>res));
  }
  
 
//   /**
// * @returns sending post request to check mobile number exist or not
// */
//   checkNumber(data): Observable<any> {
   
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json'
//       })
//     };
//     return this.http.post(this.cfg.api+'/user/Login', data, httpOptions)
//   }

  
}
