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
export class NotificationServiceProvider {

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
* @returns sending post request to get notificaions list from server
*/
  getNotificationsList(notificationObj):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.userApi,notificationObj,httpOptions)
  }

}
