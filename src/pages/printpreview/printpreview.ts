import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PrintpreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-printpreview',
  templateUrl: 'printpreview.html',
})
export class PrintpreviewPage {
  cart:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrintpreviewPage');
    this.cart=[{
      billno: "BIL110",
      myDate: "21/03/2021",
      Name: "Chicken",
      Weight: "100",
      ActualPrice: "600",
      Type: "1",
      ItemQuantity: "10",
      Price: "600",
      BillTotalAmout: "12000",
      BillQuantity: "2"
    },
    {
      billno: "BIL110",
      myDate: "21/03/2021",
      Name: "Chicken",
      Weight: "100",
      ActualPrice: "600",
      Type: "1",
      ItemQuantity: "10",
      Price: "600",
      BillTotalAmout: "12000",
      BillQuantity: "2"
    }]
    this.cart
    this.navCtrl.setRoot("NotificationsPage",this.cart);
  }

}
