import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-minimum-service-payment',
  templateUrl: 'minimum-service-payment.html',
})

/**
 * Manages all methods 
 */
export class MinimumServicePaymentPage {
  printerList:any=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl:ViewController
  ) {
    this.printerList=this.navParams.get('data');
  }

  /**
*  Fired after loading constructor
*  calling getCharges method
*/
  ionViewDidLoad() {
  }
  select(data)
  {
    this.viewCtrl.dismiss(data);
  }

  /**
*  getting charges from server 
*  @returns returns payment charges
*/
 
}
