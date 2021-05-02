import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceHistoryProvider } from '../../providers/service-history/service-history';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Moment from 'moment';
import { BookServiceProvider } from '../../providers/book-service/book-service';


/**
 * Generated class for the SalesreportbycatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-salesreportbycat',
  templateUrl: 'salesreportbycat.html',
})
export class SalesreportbycatPage {
  hidden=true;
  responsecount:number;
  hiddenDrop=false;
/**
* Value of the fromTime
*/
fromdate: any;
signup={
  state:0
}
statelist:any;

/**
* Value of the toTime
*/
todate: any;

/**
* Value of the selectedDate
*/
selectedDate: any;
products:any;
originalproducts:any;
TotalWeight=0;
/**
* Value of the jobId
*/
jobId;

/**
* Value of the minDate
*/
totalval=0;
minDate;

/**
* Value of the minTime
*/
minTime;
senderData: FormGroup;
headerTitle:any;
catid:any;
/**
*  loads first when entering to the page 
* initializing minDate value
*/
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public historyService: ServiceHistoryProvider,
    public utils: UtilsServiceProvider,
    private formbuilder: FormBuilder,
    public bookService: BookServiceProvider,

    ) {
    this.headerTitle = "Sales Report by Items";
    this.getCatagories();
    
    this.fromdate = Moment(new Date()).format("YYYY-MM-DD").toString();
    this.todate = Moment(new Date()).format("YYYY-MM-DD").toString();
  }
  getCatagories() {
    // this.utils.presentLoading();
    this.bookService.getCatagories().subscribe((Response) => {
      this.statelist=Response;
    });
  }
  selectEmployee(emp){
    this.totalval=0;
  this.TotalWeight=0;

    this.catid=emp
    this.products = this.originalproducts.filter((item) => {
      return ((item.CatagoryID) ==this.catid );
    });
    if(this.products.length>0){
      this.responsecount=1;
    this.totalval = this.products.map(bill => bill.Amount).reduce((acc, bill) => bill + acc);
  //  this.TotalWeight = this.products.map(bill => bill.Weight).reduce((acc, bill) => bill + acc);
  this.products.forEach(x => {     
        
    this.TotalWeight+=    x.Weight
 
})
this.hidden=false;

    }
    else{
      this.responsecount=0;
      this.totalval=0;
      this.TotalWeight=0;

    }

}
openDrop(){
  this.hiddenDrop=true;
}
  submitDate() {
    this.hidden=true;
    this.fromdate = Moment(this.fromdate, 'YYYY-MM-DD').format('YYYY-MM-DD').toString();
    this.todate = Moment(this.todate, 'YYYY-MM-DD').format('YYYY-MM-DD').toString();
    if(this.fromdate && this.todate)
    {
    this.utils.presentLoading();
    this.utils.getitemsbysalesreport(this.fromdate,this.todate).subscribe((Response) => {
      if(Response.length>0){
        this.responsecount=1;

        this.totalval = Response.map(bill => bill.Amount).reduce((acc, bill) => bill + acc);
       // this.TotalWeight = Response.map(bill => bill.Weight).reduce((acc, bill) => bill + acc);
       Response.forEach(x => {     
        
        this.TotalWeight=+    x.Weight
     
    })
        this.originalproducts=Response;
        this.products=Response;
        this.hidden=true;
      }
      else{
  //  this.utils.presentAlert("Oops", "No records found!");
  this.products=[];
  this.totalval=0;
  this.TotalWeight=0;
  this.responsecount=0;

      }
      this.utils.dismissLoading();

    });
  }
  else{

    this.utils.presentAlert("Oops", "Please Select Date");

  }
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesreportbycatPage');
  }

}
