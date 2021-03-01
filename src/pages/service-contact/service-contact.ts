import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceHistoryProvider } from '../../providers/service-history/service-history';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-service-contact',
  templateUrl: 'service-contact.html',
})

/**
 * Manages all methods 
 */
export class ServiceContactPage {
  /**
 * Accessing html element 
 */
hidden:any=false;
staffid:any;
totalval:number; 
headerTitle:any;
products:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public historyService: ServiceHistoryProvider,
    public utils: UtilsServiceProvider,
    private formbuilder: FormBuilder
  ) {
    this.headerTitle="Dayend Report";
   
  }

  /**
*  Fired after loading constructor
*  calling getjobDetails and loadMap methods
*/

  ionViewDidLoad() {
    this.staffid=localStorage.getItem("user_id");
    this.getsalesData()
  }
  DayendProcess(){
    this.utils.presentLoading();
    this.utils.updateDayendProcess(this.staffid).subscribe((Response) => {
      if(Response.ErrorCode>0){
    this.utils.presentAlert("Oops", "Dayend Process Completed!");
    this.getsalesData();

      }
      else{
    this.utils.presentAlert("Oops", "Dayend Process Failed!");

      }
      this.utils.dismissLoading();

    });
  }
  getsalesData(){
    this.utils.presentLoading();
    this.utils.getmusalesReport(this.staffid).subscribe((Response) => {
      if(Response.length>0){
        this.totalval = Response.map(bill => bill.OrderAmount).reduce((acc, bill) => bill + acc);
        this.products=Response;
      }
      else{
    this.utils.presentAlert("Oops", "No records found!");
    this.products=[];
    this.hidden=true;
      }
      this.utils.dismissLoading();

    });
  }
}
