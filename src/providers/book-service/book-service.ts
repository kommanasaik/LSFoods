import { HttpClient, HttpHeaders } from  '@angular/common/http' // '@angular/common/http';
import { Injectable } from '@angular/core';
import *  as AppConfig from '../../app/serverCalls';
import {Observable} from 'rxjs';
/**
 * Provider for services
*/
@Injectable()

/**
 * Manages all methods 
 */
export class BookServiceProvider {

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
* @returns sending post request to get services from server
*/
  getServices(): Observable<any> {
    let serviceObj = {
      action: "get_services",
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.api, serviceObj, httpOptions)
  }

  /**
* @returns sending post request to get sub services from server
*/
getProducts(): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/orderdetails/getproductsdetails', httpOptions)
  }

  getCatagories(): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/orderdetails/getproductcatagory', httpOptions)
  }


  /**
* @returns sending post request to submit file to server
*/
  postServiceAttachment(attachmentObj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.userApi, attachmentObj, httpOptions)
  }

  public AddProducts(ProductData):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.api+'/orderdetails/productcreation', JSON.stringify(ProductData), httpOptions)
    
  }

  public AddCatagory(ProductData):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.api+'/orderdetails/catagorycreation', JSON.stringify(ProductData), httpOptions)
    
  }

  
  public UpdateCatagory(ProductData):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.api+'/orderdetails/updatecatagoryandprice', JSON.stringify(ProductData), httpOptions)
    
  }
}
