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

  getProductsbycatid(catid): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.api+'/orderdetails/getproductsbycatid?IDs='+catid, httpOptions)
  }
  getsalesreportview(ordrid): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/orderdetails/salesreportview?OrderID='+ordrid, httpOptions)
    // return this.http.post(this.cfg.api+'/orderdetails/salesreportview?OrderID=='+ordrid, httpOptions)
  }

  getCatagories(): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/orderdetails/getproductcatagory', httpOptions)
  }

  getLocations(): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/orderdetails/getlocationnames', httpOptions)
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
  public updateproduct(ProductData):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.api+'/orderdetails/updateproduct', JSON.stringify(ProductData), httpOptions)
    
  }

  public AddCatagory(ProductData):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.api+'/orderdetails/catagorycreation', JSON.stringify(ProductData), httpOptions)
    
  }

  
  public SaveDailyStock(ProductData):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.api+'/orderdetails/savedailyStocktaken', JSON.stringify(ProductData), httpOptions)
    
  }

  
  public UpdateCatagory(ProductData):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.api+'/orderdetails/updatecatagoryandprice', JSON.stringify(ProductData), httpOptions)
    
  }

  public createcreditcustomer(ProductData):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.api+'/orderdetails/createcreditcustomer', JSON.stringify(ProductData), httpOptions)
    
  }

  
  public userprofileupdate(ProductData):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.api+'/user/userprofileupdate', JSON.stringify(ProductData), httpOptions)
    
  }
}
