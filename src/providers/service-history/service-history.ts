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
export class ServiceHistoryProvider {

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

  /**
* @returns sending post request to get booked services history
*/
  getServiceHistory(id): Observable<any> {
    let porfileObj = {
      action: "list_jobs",
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
* @returns sending post request to submit review for the service
*/
  postReview(reviewObj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.userApi, reviewObj, httpOptions)
  }

    /**
* @returns sending post request to update scheduled time
*/
  updateJob(schObj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.userApi, schObj, httpOptions)
  }

    /**
* @returns sending post request to get job details
*/
  getjobDetails(jobObj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.userApi, jobObj, httpOptions)

  }

    /**
* @returns sending post request to get payment details
*/
  getPaymentDetails(pDetailsObj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.userApi, pDetailsObj, httpOptions)

  }
  getProducts(): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/orderdetails/getproductsdetails', httpOptions)
  }
 
}
