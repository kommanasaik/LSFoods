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
export class PaymentServiceProvider {

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
* @returns sending post request after getting payment confirmation from razorpay
*/
  payMinCharge(paymentObj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.userApi, paymentObj, httpOptions)
  }

  /**
* @returns sending post request to get payment details list
*/
  getPayments(historyObj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.userApi, historyObj, httpOptions)
  }

  /**
* @returns sending post request to get charges for payments 
*/
  getcharges(chargesObj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.userApi, chargesObj, httpOptions)
  }

}
