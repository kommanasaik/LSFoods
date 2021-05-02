import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';

import { BookServiceProvider } from '../../providers/book-service/book-service';
import { state } from '@angular/core/src/animation/dsl';

/**
 * Generated class for the StaffPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-staff',
  templateUrl: 'staff.html',
})
export class StaffPage {
  registerForm:any;
  registerObj:any;
 
  signup = {
    state: 0
  }
  statelist: any;
  catid:any="";
  constructor(public navCtrl: NavController,
    public utils: UtilsServiceProvider,
    public authService: AuthServiceProvider,
    private fb: FormBuilder, 
    public bookService: BookServiceProvider,
     public navParams: NavParams) {
      this.initializeItems();
  }
  getCatagories() {
  //  this.utils.presentcatLoading();
   this.bookService.getLocations().subscribe((Response) => {
     this.statelist = Response;
     this.statelist.sort((a,b) => a.Value > b.Value ? 1 : -1)
         //  this.utils.dismissLoading();
   });
 }
 initializeItems() {
  this.getCatagories()
  this.RegisterValidation();
 

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
  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffPage');
  }
  ProductonChange($event){
  
    this.catid="";
    this.catid=$event.toString();
  
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
      UserType:"S",
      FirstName: this.registerForm.value.FullName,
      Password: this.registerForm.value.Password,
      Gmail: this.registerForm.value.Email,
      MobileNo: this.registerForm.value.Phoneno,
      Address: this.registerForm.value.Address,
      State: this.registerForm.value.State,
      Country: this.registerForm.value.Country,
      City: this.registerForm.value.City,
      PinCode: this.registerForm.value.Pin,
      OutStandingAmount:0,
      LocationID:this.catid
    }

    if(UserRegisterData.Gmail!="" && UserRegisterData.FirstName!="" && UserRegisterData.MobileNo!="" && UserRegisterData.Password!="" && this.catid!=""){
    this.authService.RegisterDetails(UserRegisterData).subscribe((Response) => {
      console.log(Response);
      if(Response.ErrorCode>0)
      {
        this.utils.presentAlert("Alert", "Successfully staff creeated.")
      this.initializeItems();
      }
      else{
     
    this.utils.presentAlert("Oops", "Please enter details correctly.")
  }
});
    }else
  {
   
    this.utils.presentAlert("Oops", "Please enter Name, Email, Mobileno, Location,Password and Location.")

  }
  }

}
