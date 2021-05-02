import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { ServiceHistoryProvider } from '../../providers/service-history/service-history';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookServiceProvider } from '../../providers/book-service/book-service';

import * as Moment from 'moment';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@IonicPage()
@Component({
  selector: 'page-schedule-job',
  templateUrl: 'schedule-job.html',
})

/**
 * Manages all methods 
 */
export class ScheduleJobPage {
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
usertype:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bookService: BookServiceProvider,
    public alertCtrl: AlertController,

    public historyService: ServiceHistoryProvider,
    public utils: UtilsServiceProvider,
    private formbuilder: FormBuilder
  ) {
    this.usertype=localStorage.getItem("UserType");
    this.headerTitle="Sales Report";
   
    this.fromdate = Moment(new Date()).format("YYYY-MM-DD").toString();
    this.todate = Moment(new Date()).format("YYYY-MM-DD").toString();
  }

  deleteBill(orderid,OrderNo){
    this.myHandlerFunction(orderid,OrderNo,"Delete") 

  }
  myHandlerFunction(orderid,OrderNo,Type) {
    let alert = this.alertCtrl.create({
      title: Type,
      cssClass: 'alertCancel',
      mode: 'ios',
      message: 'Do you want to '+ Type+' this order:' +OrderNo+' ?',
      buttons: [
       
        {
          text: 'Yes',
          cssClass: 'alertButton',
          handler: () => {
            if(Type=="Delete")
            {
           this.deleteOrderBill(orderid)
            }
            else{
              this.previewprints(orderid)
            }
          }
        },
        {
          text: 'No',
          cssClass: 'alertButton',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }
deleteOrderBill(orderid){
  this.utils.deleteOrderbill(orderid).subscribe((Response) => {
    if (Response.ErrorCode > 0) {
      this.submitDate();
    }
  });
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
   this.utils.delallcart();
    this.fromdate = Moment(this.fromdate, 'YYYY-MM-DD').format('YYYY-MM-DD').toString();
    this.todate = Moment(this.todate, 'YYYY-MM-DD').format('YYYY-MM-DD').toString();
    if(this.fromdate && this.todate)
    {
    this.utils.presentLoading();
    this.utils.getsalesreport(this.fromdate,this.todate).subscribe((Response) => {
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
  previewprint(orderid,OrderNo){
 this.myHandlerFunction(orderid,OrderNo,"Print") 
}
  previewprints(orderid){
    this.cart=[];
    this.bookService.getsalesreportview(orderid).subscribe((Response) => {
      // for(var i=0;i<Response.length;i++){
      //   Response[i]["Price"]=Response[i]["ActualPrice"];
      // }
      this.cart=Response;
console.log(this.cart);
this.navCtrl.push("NotificationsPage",this.cart);

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
