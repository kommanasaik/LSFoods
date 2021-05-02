import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceHistoryProvider } from '../../providers/service-history/service-history';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookServiceProvider } from '../../providers/book-service/book-service';

import * as Moment from 'moment';
/**
 * Generated class for the CredcustomerpaymentreportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-credcustomerpaymentreport',
  templateUrl: 'credcustomerpaymentreport.html',
})
export class CredcustomerpaymentreportPage {
  responsecount:number;
  /**
  * Value of the fromTime
  */
  cart:any;
  
    fromdate: any;
  
    /**
  * Value of the toTime
  */
    todate: any;
  
    /**
  * Value of the selectedDate
  */
    selectedDate: any;
    products:any;
    /**
  * Value of the jobId
  */
    jobId;
  
    /**
  * Value of the minDate
  */
  totalval;
    minDate;
  
    /**
  * Value of the minTime
  */
    minTime;
    senderData: FormGroup;
    headerTitle:any;
    /**
  *  loads first when entering to the page 
  * initializing minDate value
  */
    constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public bookService: BookServiceProvider,
  
      public historyService: ServiceHistoryProvider,
      public utils: UtilsServiceProvider,
      private formbuilder: FormBuilder
    ) {
      this.headerTitle="Payment Type Reports";
     
      this.fromdate = Moment(new Date()).format("YYYY-MM-DD").toString();
      this.todate = Moment(new Date()).format("YYYY-MM-DD").toString();
    }
  
    /**
  *  Fired after loading constructor
  *  Getting job id through navparams
  */
    ionViewDidLoad() {
      this.fromdate = Moment(new Date()).format("YYYY-MM-DD").toString();
      this.todate = Moment(new Date()).format("YYYY-MM-DD").toString();
    }
  
    /**
  *  Fired after selecting date
  *  @returns returns minimum time value
  */
  
  submitDate() {
     
      this.fromdate = Moment(this.fromdate, 'YYYY-MM-DD').format('YYYY-MM-DD').toString();
      this.todate = Moment(this.todate, 'YYYY-MM-DD').format('YYYY-MM-DD').toString();
      if(this.fromdate && this.todate)
      {
      this.utils.presentLoading();
      this.utils.getPaymentTypeReport(this.fromdate,this.todate).subscribe((Response) => {
        if(Response.length>0){
          this.responsecount=1;
  
          this.totalval = Response.map(bill => bill.OrderAmount).reduce((acc, bill) => bill + acc);
          this.products=Response;
          this.cart=Response;
          this.products.sort(function(a, b){
            return b.SeqNo - a.SeqNo;
        });
        
        }
        else{
    //  this.utils.presentAlert("Oops", "No records found!");
      this.products=[];
      this.totalval=0;
      this.responsecount=0;
  
        }
        this.utils.dismissLoading();
  
      });
    }
    else{
  
      this.utils.presentAlert("Oops", "Please Select Date");
  
    }
    }
  
    previewprint(orderid){
      this.cart=[];
      this.bookService.getsalesreportview(orderid).subscribe((Response) => {
        // for(var i=0;i<Response.length;i++){
        //   Response[i]["Price"]=Response[i]["ActualPrice"];
        // }
        this.cart=Response;
  console.log(this.cart);
  this.navCtrl.setRoot("NotificationsPage",this.cart);
  
      });
    }
    
    getItemslist(ev) {
      // Reset items back to all of the items
      // set val to the value of the ev target
      var val = ev.target.value;
  
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.products = this.cart.filter((item) => {
          return (item.OrderNo.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
        if(this.products.length>0){
          this.responsecount=1;
          
                }
                else{
          this.responsecount=0;
          this.totalval=0;
                }
      }
      else {
        this.products = this.cart
        if(this.products.length>0){
  this.responsecount=1;
  
        }
        else{
          this.totalval=0;
  this.responsecount=0;
  
        }
  
      }
    }
    onCancel(ev) {
      ev.target.value = '';
  this.responsecount=1;
  this.totalval=0;
  
    }
    
}