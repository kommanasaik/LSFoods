import { Component,ViewChild, ElementRef,NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';

/**
 * Generated class for the GoogelmapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-googelmap',
  templateUrl: 'googelmap.html',
})
export class GoogelmapPage {

  /**
*  loads first when entering to the page 
*  Getting job id through navparams
*/
mailmob:any;
headerTitle:any;
  constructor( private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public utils: UtilsServiceProvider,
     public plt: Platform,public navCtrl: NavController, public navParams: NavParams,public zone: NgZone) {
   this.headerTitle="Payments"
  
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad GoogelmapPage');
  }
  submitbtn(){
    if(this.mailmob){
    this.utils.presentLoading();
   
    this.utils.getuseraccountdetails(this.mailmob).subscribe((Response) => {
    console.log(Response);
    this.utils.dismissLoading();
      if(Response.UserID){
        let outamt=Response.OutstandingAmount;
        let user=this.mailmob;
        if(outamt>0){

        }else{
          outamt=0;
        }
        let data={
          outamt:outamt,
          user:this.mailmob
        }
        this.navCtrl.setRoot("PaymentcompletePage",data);
      }
      else{

    this.utils.presentAlert("Oops", "User not exists!")
      }
    });
  }
  else{
    this.utils.presentAlert("Oops", "Please enter details correctly.")

  }
  }


}
