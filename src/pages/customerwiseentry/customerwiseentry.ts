import { Component,ViewChild, ElementRef,NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';

/**
 * Generated class for the CustomerwiseentryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customerwiseentry',
  templateUrl: 'customerwiseentry.html',
})
export class CustomerwiseentryPage {

  mailmob:any;
  headerTitle:any;
    constructor( private geolocation: Geolocation,
      private nativeGeocoder: NativeGeocoder,
      public utils: UtilsServiceProvider,
       public plt: Platform,public navCtrl: NavController, public navParams: NavParams,public zone: NgZone) {
     this.headerTitle="Customer Book Order"
    
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
          let usrid=Response.UserID;
          this.utils.getcredituserprofile(usrid).subscribe((Responses) => {
            if(Responses=="Invalid"){
              this.utils.presentAlert("Oops", "Invalid Credit Customer, Please enter proper details.")
            }
            else{
            let data={
              customerid:usrid,
              userdata:Responses  ,
              flag:'CC'
            }
            this.navCtrl.setRoot("BookServicePage",data);
          }
          });
         
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
