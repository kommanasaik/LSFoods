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
export class ProfileServiceProvider {

  /**
* Value of the header cfg
*/
  cfg: any;

  /**
* @returns loads first when entering to the page 
*/
  constructor(public http: HttpClient) {
    this.cfg = AppConfig.cfg;
  }

  /**
* @returns sending post request to get profile data
*/
  getProfile(id): Observable<any> {
    let porfileObj = {
      action: "get_user_data",
      id: id
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.userApi, porfileObj, httpOptions)
  }

  /**
* @returns sending post request to update profile data
*/
  postProfile(profileForm): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.userApi, profileForm, httpOptions)
  }

}
