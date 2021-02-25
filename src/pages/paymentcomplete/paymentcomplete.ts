import { Component,ViewChild, ElementRef,NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';

/**
 * Generated class for the PaymentcompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paymentcomplete',
  templateUrl: 'paymentcomplete.html',
})
export class PaymentcompletePage {
  mailmob:any;
  headerTitle:any;
  UserID:any;
  OutstandingAmount:any;
  constructor(private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public utils: UtilsServiceProvider,
     public plt: Platform,public navCtrl: NavController, public navParams: NavParams,public zone: NgZone) {
   this.headerTitle="Payments"
   this.OutstandingAmount= this.navParams.data.outamt;
   this.UserID= this.navParams.data.user;

  }
  submitbtn(){
    if(this.mailmob){
   let data={
    UserID:this.UserID,
    OutstandingAmount:this.mailmob
   }
   if(this.mailmob<=this.OutstandingAmount){
   this.utils.presentLoading();

    this.utils.postuseraccountdetails(data).subscribe((Response) => {
    console.log(Response);
    this.utils.dismissLoading();
      if(Response.ErrorCode>0){
      
        this.navCtrl.setRoot("GoogelmapPage");
      }
      else{

    this.utils.presentAlert("Oops", "Failed!")
      }
    });
  }
  else{
    this.utils.presentAlert("Oops", "Please enter amount lessthan equal to outstandamount")

  }
}
  else{
    this.utils.presentAlert("Oops", "Please enter details correctly.")

  }
  
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentcompletePage');
  }
  gotoHome(){
    this.navCtrl.setRoot("GoogelmapPage");

  }

}
