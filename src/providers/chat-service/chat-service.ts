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
export class ChatServiceProvider {
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
* @returns sending post request to get chat data from server
*/
  chatData(chatObj):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.userApi,chatObj,httpOptions)
  }


        /**
* @returns sending post request to chat message to server
*/
  postMessage(chatObj):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.userApi,chatObj,httpOptions)
  }

        /**
* @returns sending post request get unread chat from server
*/
  unreadChat(chatObj):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.userApi,chatObj,httpOptions)
  }

}
