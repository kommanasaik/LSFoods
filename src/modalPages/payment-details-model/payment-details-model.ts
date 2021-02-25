import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ServiceHistoryProvider } from '../../providers/service-history/service-history';

@IonicPage()
@Component({
  selector: 'page-payment-details-model',
  templateUrl: 'payment-details-model.html',
})

/**
 * Manages all methods 
 */
export class PaymentDetailsModelPage {

  /**
* Value of the job
*/
  job;

  /**
* Value of the jobCharges
*/
  jobCharges: Array<any> = [];

  /**
*  loads first when entering to the page 
* getting job details through navparams
* initializing job 
*/
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    public historyService: ServiceHistoryProvider,
  ) {
    this.job = this.navParams.get('job');

  }

  /**
*  Fired after loading constructor
*/
  ionViewDidLoad() {
    this.getPaymentDetails();
  }

  /**
*  getting payment details 
* @returns returns job charges
*/
  getPaymentDetails() {
    this.jobCharges = []
    this.historyService.getPaymentDetails(this.job).subscribe((result) => {
      this.jobCharges = result.data;
    })
  }

  /**
*  closing page
*/
  closeModal() {
    this.viewController.dismiss();
  }

}
