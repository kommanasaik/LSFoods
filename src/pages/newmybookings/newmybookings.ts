import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';

/**
 * Generated class for the NewmybookingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newmybookings',
  templateUrl: 'newmybookings.html',
})
export class NewmybookingsPage {
  headerTitle:any;
  registerForm:any;
  registerObj:any;
  constructor(
    public utils: UtilsServiceProvider,
    public authService: AuthServiceProvider,
    public navCtrl: NavController, private fb: FormBuilder, public navParams: NavParams) {
      this.initializeItems();
    
    //this.headerTitle="My Bookings";
  }
  initializeItems() {
    this.RegisterValidation();
   

  }
  ionViewDidLoad() {

  }
  RegisterValidation() {
    this.registerForm = this.fb.group({
      Pin: ['', Validators.required],
      Password: ['', Validators.required],
      FullName: ['', Validators.required],
      Email: ['', Validators.required],
      Phoneno: ['', Validators.required],
      UserID: ['', Validators.required],
      Country: ['', Validators.required],
      State: ['', Validators.required],
      City: ['', Validators.required],
      Address: ['', Validators.required],
    });
  }
  onRegisterSubmit() {
    console.log(this.registerForm.value);
    this.registerObj = {
      UserType:"",
      UserID:'',
      Password: '',
      Email: '',
      Pin: '',
      Phoneno:'',
      FullName:'',
      Address:'',
      State:'',
      Country:'',
      City:'',
    }

    let UserRegisterData = {
      UserType:"C",
      FirstName: this.registerForm.value.FullName,
      Password: this.registerForm.value.Password,
      Gmail: this.registerForm.value.Email,
      MobileNo: this.registerForm.value.Phoneno,
      Address: this.registerForm.value.Address,
      State: this.registerForm.value.State,
      Country: this.registerForm.value.Country,
      City: this.registerForm.value.City,
      PinCode: this.registerForm.value.Pin,
      OutStandingAmount:0
    }

    if(UserRegisterData.Gmail!="" && UserRegisterData.MobileNo!="" && UserRegisterData.Password!=""){
    this.authService.RegisterDetails(UserRegisterData).subscribe((Response) => {
      console.log(Response);
      if(Response.ErrorCode>0)
      {
      this.navCtrl.setRoot("LoginPage");
      }
      else{
     
    this.utils.presentAlert("Oops", "Please enter details correctly.")
  }
});
    }else
  {
   
    this.utils.presentAlert("Oops", "Please enter Email, Mobileno and Password.")

  }
  }

  // go to login page
  login() {
    this.navCtrl.setRoot("LoginPage");


  }

}
