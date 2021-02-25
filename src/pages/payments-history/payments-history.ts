// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams} from 'ionic-angular';
// import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaymentServiceProvider } from '../../providers/payment-service/payment-service';
import { Storage } from '@ionic/storage';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';


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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public utils: UtilsServiceProvider
  ) {
    this.headerTitle = "View Orders Page";
   this.OrderID= this.navParams.data.OrderID;
   this.OrdeDateStr= this.navParams.data.OrdeDateStr;
   this.ProductAmount= this.navParams.data.TotalAmount;


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
}
