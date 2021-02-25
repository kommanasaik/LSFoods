import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ServiceHistoryProvider } from '../../providers/service-history/service-history';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';

@IonicPage()
@Component({
  selector: 'page-job-detail-model',
  templateUrl: 'job-detail-model.html',
})

/**
 * Manages all methods 
 */
export class JobDetailModelPage {

  /**
* Value of the jobId
*/
  jobId;

  /**
* Value of the jobDetails
*/
  jobDetails: Array<any> = [];

  /**
*  loads first when entering to the page 
* getting jobid through navparams
* initializing jobId
*/
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    public historyService: ServiceHistoryProvider,
    public utils: UtilsServiceProvider
  ) {
    this.jobId = this.navParams.get("job_id")
    // this.jobDetails = [];
  }

  /**
*  Fired after loading constructor
* calling getjobDetails method
*/
  ionViewDidLoad() {
    this.getjobDetails();
  }

  /**
*  getting job details from server
* start loading when method calls 
* stop loading when getting response from server
* @returns returns job details
*/
  getjobDetails() {
    this.utils.presentLoading();
    let jobObj = {
      action: "get_job_data",
      id: this.jobId
    }
    this.historyService.getjobDetails(jobObj).subscribe((result) => {
      this.utils.dismissLoading();
      if (result) {
        this.jobDetails.push(result.data);
      }

    })
  }

  /**
*  to close this page
*/
  closeModal() {
    this.viewController.dismiss();
  }


}
