import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ModalController } from 'ionic-angular';
import { Observable,BehaviorSubject } from 'rxjs';
// import { map } from 'rxjs/operator';
import *  as AppConfig from '../../app/serverCalls';
import { Storage } from '@ionic/storage';


/**
 * Provider for services
*/
@Injectable()

/**
 * Manages all methods 
 */
export class UtilsServiceProvider {
  /**
  Value of the loading
*/
cfg: any;

cart:any=[];
  private cartItemCount = new BehaviorSubject(0);
 
  loading;

  /**
*  loads first when entering to the page 
*/
  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    public modalController: ModalController,
    public http: HttpClient,
    public storage: Storage,

  ) {
    this.cfg = AppConfig.cfg;


  }

  getCart() {
    return this.cart;
  }
 
  getCartItemCount() {
    return this.cartItemCount;
  }

  public addProduct(product){
    let added = false;
    for (var i = 0; i < this.cart.length; i++) {
      if (this.cart[i].ID === product.ID) {
          this.cart.splice(i, 1);
          added=false;
      }
    }
    if (!added) {
      product.count = 1;
      this.cart.push(product);
    }
    console.log(this.cart);
  this.cartItemCount.next(this.cartItemCount.value + 1);
  }
 
  public delallcart(){
    this.cart=[];
    this.cartItemCount.next(0);
  }
  public decProduct(product){
      for (var i = 0; i < this.cart.length; i++) {
      if (this.cart[i].ID === product.ID) {
        this.cart[i].count -= 1;
        if (this.cart[i].count == 0) {
          this.cart.splice(i, 1);
        }
      }
    }
    console.log(this.cart);

    if(this.cartItemCount.value<=0){
      this.cartItemCount.next(0);
    }
    else
    {
   this.cartItemCount.next(this.cartItemCount.value - 1);
    }
  }

  public removeProduct(product){
    let cartamount=0;
    for (var i = 0; i < this.cart.length; i++) {
    if (this.cart[i].ID === product.ID) {
      cartamount=this.cart[i].count;
      this.cart[i].count = 0;
      if (this.cart[i].count == 0) {
        this.cart.splice(i, 1);
      }
    }
  }
  console.log(this.cart);

  if(this.cartItemCount.value<=0){
    this.cartItemCount.next(0);
  }
  else
  {
 this.cartItemCount.next(this.cartItemCount.value - cartamount);
  }
}
  /**
  * @param head alert header
  *  @param body alert description
  *  @returns common alert for entire application
*/
  async presentAlert(head, body) {
    const alert = await this.alertController.create({
      title: head,
      message: body,
      buttons: ['OK'],
    });
    await alert.present();
  }

  /**
    * @returns common loader for entire application to load
  */
  async presentLoading() {
    this.loading = await this.loadingController.create({
      spinner: 'dots',
      content: 'Please wait...',
    });
    return await this.loading.present();
  }
  async presentcatLoading() {
    this.loading = await this.loadingController.create({
       spinner: 'dots',
      content: 'Please wait,Catagories Loading',
    });
    return await this.loading.present();
  }

  /**
  * @returns common loader for entire application to dismiss loading 
*/
  async dismissLoading() {
    return await this.loading.dismiss();
  }

  public ProductTransactions(passcart):Observable<any>{
    if(this.cart.length>0){
    if(this.cart[0].Name!=undefined){
      this.cart=this.cart;
    }
    else{
      this.cart=passcart;
    }

    }
    else{
      this.cart=passcart;

    }
    
    console.log(this.cart);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.api+'/orderdetails/placingorder', JSON.stringify(this.cart), httpOptions)
      
  }
  public postuseraccountdetails(data):Observable<any>{
    
    console.log(this.cart);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.api+'/orderdetails/postuseraccountdetails', JSON.stringify(data), httpOptions)
    
  }

  public deleteOrderbill(orderid):Observable<any>{
    

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/orderdetails/deletebill?OrderId='+orderid, httpOptions)
    
  }
  public deliverorder(orderid,userddi):Observable<any>{
    

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/orderdetails/markasdeleverd?OrderID='+orderid+'&&StaffID='+userddi, httpOptions)
    
  }

  getProducts(): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/orderdetails/getproductsdetails', httpOptions)
  }
  getallstaff(): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/orderdetails/staffdetailsdata', httpOptions)
  }
  getallcreditcustomers(): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/orderdetails/getallcreditcustomers', httpOptions)
  }
  getpurchasereport(fromdate,todate): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/orderdetails/getpurchasereport?PurFromDate='+fromdate+'&PurToDate='+todate, httpOptions)
  }
  getPaymentTypeReport(fromdate,todate): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/orderdetails/getPaymentTypeReport?FromDate1='+fromdate+'&ToDate1='+todate, httpOptions)
  }
  getcreditcustomersreport(fromdate,todate,custid): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/orderdetails/getcreditcustomersreport?FromDate1='+fromdate+'&ToDate1='+todate+'&custId='+custid, httpOptions)
  }
  getsalesreport(fromdate,todate): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/orderdetails/getsalesreport?fromDate='+fromdate+'&toDate='+todate, httpOptions)
  }

  getitemsbysalesreport(fromdate,todate): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/orderdetails/getitemwisesalesreport?fromDate='+fromdate+'&toDate='+todate, httpOptions)
  }

  getmusalesReport(userid): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/orderdetails/getmysalesreport?StaffID='+userid, httpOptions)
  }
  updateDayendProcess(userid): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/orderdetails/markasendshift?StaffID='+userid, httpOptions)
  }
  getproductcatagory(): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/orderdetails/getproductcatagory', httpOptions)
  }
  getproductcatagoryByid(prodid): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/orderdetails/getcatagorydetails?ID='+prodid, httpOptions)
  }
  getcredituserprofile(prodid): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/user/getcredituserprofile?UserID='+prodid, httpOptions)
  }
  getproductByid(prodid): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/orderdetails/getproductbyid?ID='+prodid, httpOptions)
  }
  getuseraccountdetails(data): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/orderdetails/getuseraccountdetails?UserID='+data, httpOptions)
  }
  public getmyorders():Observable<any>{
    let userid=localStorage.getItem('user_id');
    let usertype=localStorage.getItem('UserType');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/orderdetails/getuserorders?UserID='+userid+'&UserType='+usertype, httpOptions)
  }
  public getVieworders(OrderID):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.cfg.api+'/orderdetails/getorderdetailview?OrderId='+OrderID, httpOptions)
  }
}
