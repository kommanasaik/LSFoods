import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import *  as AppConfig from '../../app/serverCalls';
import { Observable } from 'rxjs';

/**
 * Provider for services
*/
@Injectable()

/**
 * Manages all methods 
 */
export class ReviewServiceProvider {

   /**
* Value of the header cfg
*/
cfg:any;

/**
*  loads first when entering to the page 
*/
constructor(public http: HttpClient) {
this.cfg=AppConfig.cfg;
}

    /**
* @returns sending post request to get submitted reviews
*/
  getUserReviews(action,id):Observable<any>{
    let reviewObj={
      action:action,
      id:id
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.userApi,reviewObj,httpOptions)
  }

}
