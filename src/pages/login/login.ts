import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { FormGroup, Validators,FormControl, FormBuilder } from '@angular/forms';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { FCM } from '@ionic-native/fcm';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { AnonymousSubject } from 'rxjs';
import { ServicecallsProvider } from '../../providers/servicecalls/servicecalls';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

/**
 * Manages all methods 
 */
export class LoginPage {
  /**
 * defining showOtp to handle to show otp options
 */
loginForm:any;
  LoginDetailsObj:any;
  phoneno:string='';

  showOtp: boolean;
  maxtime: any=10;
  timer:any;
  hidevalue :boolean;
  /**
*  Value of the firebase Token 
*/
  fcmToken;

  /**
*  Value of the device unique Id  
*/
  deviceId;

  /**
*  defining otpForm  
*/
  private otpForm: FormGroup;

  /**
*  defining numberForm  
*/
  private numberForm: FormGroup;

  /**
*  loads first when entering to the page 
*  initializing numberForm and otpForm
*  validating numberForm and otpForm
*  @returns firebase token and device unique id
*/
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public storage: Storage,
    private formBuilder: FormBuilder,
    public utils: UtilsServiceProvider,
    private fcm: FCM,
    private uniqueDeviceID: UniqueDeviceID,
    private ss:ServicecallsProvider
  ) {
    this.LoginDetailsObj = {
      Username: '',
      Password: ''
    }
    this.loginForm = new FormGroup({
      'Username': new FormControl(this.LoginDetailsObj.Username, Validators.required),
      'Password': new FormControl(this.LoginDetailsObj.Password, Validators.required)
    });
  }
  register() {
    this.navCtrl.setRoot("NewmybookingsPage");

  }
  login() {
    this.timer=0;
    this.maxtime=10;
    let UserLoginData = {
      Password: this.loginForm.value.Password,
      UserName: this.loginForm.value.Username
    }
   if (UserLoginData.UserName != "" && UserLoginData.Password != "") {
    this.utils.presentLoading();
    this.authService.CheckUserLogin(UserLoginData).subscribe((result) => {
      this.utils.dismissLoading();
      if (result==="Invalid") {
        this.utils.presentAlert("Oops", "Invalid Details");
      }else{
        if (result.userid != "") {
            localStorage.setItem("user_id", result.UserId)
            localStorage.setItem("user_name", result.UserName)
            localStorage.setItem("user_phone", result.MobileNo)
            localStorage.setItem("user_email", result.Gmail)
            localStorage.setItem("UserType", result.UserType)
          
            this.navCtrl.setRoot("BookServicePage");
          
  
        }
        else if(result.error) {
          this.utils.presentAlert("Oops", result.error);
        }
        }
      
    
   })
  }
  else{
    let msgObj = {
      message: "Please Enter Login Details"
    }
    this.utils.presentAlert("Alert", msgObj.message);
    
  }
  }
  
 

}
