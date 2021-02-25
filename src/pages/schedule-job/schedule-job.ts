import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceHistoryProvider } from '../../providers/service-history/service-history';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as Moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-schedule-job',
  templateUrl: 'schedule-job.html',
})

/**
 * Manages all methods 
 */
export class ScheduleJobPage {
  /**
* Value of the fromTime
*/
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
    public historyService: ServiceHistoryProvider,
    public utils: UtilsServiceProvider,
    private formbuilder: FormBuilder
  ) {
    this.headerTitle="Sales Report";
  }

  /**
*  Fired after loading constructor
*  Getting job id through navparams
*/
  ionViewDidLoad() {
    
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
    this.utils.getsalesreport(this.fromdate,this.todate).subscribe((Response) => {
      if(Response.length>0){
        this.products=Response;
      }
      else{
    this.utils.presentAlert("Oops", "No records found!");

      }
      this.utils.dismissLoading();

    });
  }
  else{

    this.utils.presentAlert("Oops", "Please Select Date");

  }
  }



}
