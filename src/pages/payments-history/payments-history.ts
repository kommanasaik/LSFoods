// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams} from 'ionic-angular';
// import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { PaymentServiceProvider } from '../../providers/payment-service/payment-service';
import { Storage } from '@ionic/storage';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';

import {LaunchNavigator,LaunchNavigatorOptions} from '@ionic-native/launch-navigator';

import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions,NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

@IonicPage()
@Component({
  selector: 'page-payments-history',
  templateUrl: 'payments-history.html',
})

/**
 * Manages all methods 
 */
export class PaymentsHistoryPage {
  /**
* Value of the header title
*/
hidden:boolean=false;
searchresponse:any;
  headerTitle;

  /**
* Value of the paymentsList
*/
  paymentsList: Array<any> = []

  /**
*  loads first when entering to the page 
* initializing heaserTitle value
*/
OrdeDateStr:any;
ProductAmount:any;
OrderID:any;
products:any;
BillNo:any;
MobileNo:any;
Address:any;
Lat:any;
Lng:any;

CustomerName:any;
usertype:any;
  constructor(
    public alertCtrl: AlertController,

    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public utils: UtilsServiceProvider,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private launchNavigator: LaunchNavigator
  ) {
this.usertype=localStorage.getItem("UserType");

    this.headerTitle = "View Orders Page";
   this.OrderID= this.navParams.data.OrderID;
   this.BillNo= this.navParams.data.Billno;

   this.OrdeDateStr= this.navParams.data.OrdeDateStr;
   this.ProductAmount= this.navParams.data.TotalAmount;

   this.MobileNo= this.navParams.data.MobileNo;

   this.CustomerName= this.navParams.data.CustomerName;
   this.Address= this.navParams.data.Address;
   this.Lat= this.navParams.data.latitude;
   this.Lng= this.navParams.data.longitude;




  }
  proceedtocheckout(){
    this.myHandlerFunction(this.OrderID) 
  }
  myHandlerFunction(orderid) {
   let userddi = localStorage.getItem('user_id');
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      cssClass: 'alertCancel',
      mode: 'ios',
      message: 'Do you want to deliver this order:' +this.BillNo+' ?',
      buttons: [
       
        {
          text: 'Yes',
          cssClass: 'alertButton',
          handler: () => {
           this.deleteOrderBill(orderid,userddi)
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
deleteOrderBill(orderid,userddi){
  this.utils.deliverorder(orderid,userddi).subscribe((Response) => {
    if (Response.ErrorCode > 0) {
      this.navCtrl.setRoot("ServiceJobHistoryPage");
    }
  });
}
  /**
*  Fired after loading constructor
*  calling getPaymentHistory method
*/
backPage(){
  this.navCtrl.setRoot("ServiceJobHistoryPage");

}
  ionViewDidLoad() {
     this.RegisterValidation(this.OrderID);
   
  }

    /**
*  getting payment details from server
 * start loading when method calls 
  * stop loading when getting response from server
  * @returns returns paymentsList
*/
RegisterValidation(OrderID) {  
  this.utils.presentLoading();
     this.utils.getVieworders(OrderID).subscribe((Response) => {
     console.log(Response);
     if(Response.length<=0){
     this.utils.dismissLoading();
     this.products=[]; 
     }
     else
     {
     if(Response!="")
     {
       this.products=Response;
       this.searchresponse=Response;
     console.log(this.products);
     this.utils.dismissLoading();
     }
     else
     {
       this.utils.dismissLoading();      }
   }
   });
 }
 
 locateCustomer() {
  // let latitude = parseFloat('16.984010');
  //let longitude = parseFloat('81.783510');
  let latitude = parseFloat(this.Lat);
  let longitude = parseFloat(this.Lng);
  this.navigateMaps(latitude, longitude)
}
navigateMaps(lat, lng) {
  this.geolocation.getCurrentPosition().then((resp) => {
 
    let options: LaunchNavigatorOptions = {
      start: [resp.coords.latitude, resp.coords.longitude],
      app: this.launchNavigator.APP.USER_SELECT
    };
    this.launchNavigator.navigate([lat, lng], options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  })
 
}
}
