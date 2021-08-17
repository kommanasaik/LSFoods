import { Component } from '@angular/core';
import { state } from '@angular/core/src/animation/dsl';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { BehaviorSubject } from 'rxjs';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { BookServicePage } from '../book-service/book-service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BookServiceProvider } from '../../providers/book-service/book-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {WeightapdPipe} from '../../pipes/weight/weight';
import {LaunchNavigator,LaunchNavigatorOptions} from '@ionic-native/launch-navigator';

import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions,NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
/**
 * Generated class for the BilldetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-billdetails',
  templateUrl: 'billdetails.html',
})
export class BilldetailsPage {
  cart = [];
  hidden=false;
  hiddendetails=false;
  custid="";
  hiddenForm=false;
  hiddenForm1=true;
  paymentname='';
  signup={
    state:0
  }
  statelist=[{
    state_id:1,
    state_name:'Cash'
  },{
    state_id:2,
    state_name:'Credit'
  }
  ,{
    state_id:3,
    state_name:'PhonePay'
  },{
    state_id:4,
    state_name:'GooglePay'
  },{
    state_id:5,
    state_name:'Paytm'
  }
  ,{
    state_id:6,
    state_name:'Card'
  }
];
custlat:string="";

custlng:string="";
custadd:string="";

custhidden:boolean=false;
  custname="";
  custmobile="";
  totalbillamount:number;
  totalquantity:number;
  custuserid="";
  registerForm:any;
  registerObj:any;
  cartItemCount: BehaviorSubject<number>;
  editdata:any;
  creditcustname="";
  creditcustmobile="";
  LocationID="";
  locations:any;
  usertype:any;
  address='';
  locationDetails: Array<any> = [];

  constructor(
      public authService: AuthServiceProvider,
      public navCtrl: NavController,private fb: FormBuilder, public navParams: NavParams,
    public alertCtrl: AlertController,
    public bookService: BookServiceProvider,
    public utils: UtilsServiceProvider,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private launchNavigator: LaunchNavigator

    ) {
this.usertype=localStorage.getItem("UserType");

      if(navParams.data[0]==undefined){
if(this.usertype==="C"){
  this.navCtrl.setRoot("CustomerorderPage");

}
else{
  this.navCtrl.setRoot("BookServicePage");
}
      }else{
      this.cart= navParams.data;
    this.RegisterValidation();
    this.getCatagories()
      }
      
console.log(this.cart);

  }
  getCatagories() {
    //  this.utils.presentcatLoading();
     this.bookService.getLocations().subscribe((Response) => {
       this.locations = Response;
       this.locations.sort((a,b) => a.Value > b.Value ? 1 : -1)
           //  this.utils.dismissLoading();
     });
   }
   ProductonChange($event){
  
    this.LocationID="";
    this.LocationID=$event.toString();
    this.hiddenForm1=false;
    }
  RegisterValidation() {
    this.registerForm = this.fb.group({
    //  Pin: ['', Validators.required],
      //Password: ['', Validators.required],
      FullName: ['', Validators.required],
      Email: ['', Validators.required],
      Phoneno: ['', Validators.required],
      UserID: ['', Validators.required],
      // Country: ['', Validators.required],
      // State: ['', Validators.required],
      // City: ['', Validators.required],
      Address: ['', Validators.required],
    });
  }
  backPage(){
    let data={
      frompage:'billpage'  
    }
    if(this.usertype==="C"){
      this.navCtrl.setRoot("CustomerorderPage");
    
    }
    else{
      this.navCtrl.setRoot("BookServicePage");
    }
  //this.navCtrl.setRoot("BookServicePage",data);

    // this.navCtrl.setRoot("BookServicePage");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BilldetailsPage');
    
    if(this.cart.length>0){
    this.totalbillamount=this.cart[0].BillTotalAmout;
    this.totalquantity=this.cart[0].BillQuantity;
    if(this.cart[0].flag=="CC"){
      this.custhidden=true;

      this.custid=this.cart[0].mobileno;
      this.creditcustmobile=this.cart[0].mobileno;

      this.creditcustname=this.cart[0].cname;

    }
  }}
  
  // goBack(){
  //   let data={"frompage":"frombillpage"};
  //   this.navCtrl.setRoot("BookServicePage",data);
  // }
  removeallcart() {
      this.utils.delallcart();
    }
    removecart(product) {
      if(product.count>0){
      //  this.cartService.addProduct(product);
        this.utils.decProduct(product);
      }
      }
     
     
      gotodelete(product){
        this.utils.removeProduct(product);   
      }
      selectEmployee(emp){
        this.paymentname=emp.state_name
          if(emp.state_id==2){
            this.hidden=true;
        this.hiddenForm=false;

          }
          else{
            this.hidden=false;
            this.hiddenForm1=false;
          }
      }
      checkno(){
        let checckno=this.custid;
        if(checckno!=""){
          this.utils.presentLoading();
   
    this.utils.getuseraccountdetails(checckno).subscribe((Response) => {
    console.log(Response);
    this.utils.dismissLoading();
      if(Response.UserID){
        this.hiddenForm1=false;
        this.hidden=false;
        this.hiddendetails=true;
this.custuserid=Response.UserID;
this.creditcustmobile=Response.MobileNo;
this.creditcustname=Response.Name;
      }
      else{
        this.hiddenForm=true;
        this.hidden=false;
      }
    });
        }
      }
      myHandlerFunction() {
        let userddi = localStorage.getItem('user_id');
         let alert = this.alertCtrl.create({
           title: 'Confirm',
           cssClass: 'alertCancel',
           mode: 'ios',
           message: 'Do you want to confirm ?',
           buttons: [
            
             {
               text: 'Yes',
               cssClass: 'alertButton',
               handler: () => {
                this.proceedtocheckout()
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
      confirmOrder(){
        this.myHandlerFunction();
      }
      preproceedtocheckout(){
        if(this.usertype=="C"){
          if(this.LocationID && this.address){
            if(this.address){
              this.getadd(this.address);
            }
            this.confirmOrder();
          }
          else{
            if(this.LocationID && this.address){
            this.utils.presentAlert("Oops", "Please select Location, Address");
            }
            else if(!this.LocationID){
              this.utils.presentAlert("Oops", "Please select Location");

            }
            if(!this.address){
              this.utils.presentAlert("Oops", "Please Enter Address or Select Current Location");

            }
          }
        }else{

          this.confirmOrder();
        }
      }
      proceedtocheckout() {
        let custname=this.custname;
        let custmobile=this.custmobile;
        let paymentmode=0;
        let paymentmodess="";
        paymentmode=this.signup.state;
        paymentmodess=paymentmode==2?"Credit":this.paymentname;
        if(this.usertype=="C"){
          paymentmode=1;
          paymentmodess="Cash";
        }
        for (var oa = 0; oa < this.cart.length; oa++) {
          this.cart[oa]["latitude"]=this.custlat;
          this.cart[oa]["longitude"]=this.custlng;
          this.cart[oa]["address"]=this.address;
                     
          this.cart[oa]["PaymentType"]=paymentmodess;
          this.cart[oa]["LocationID"]=this.LocationID;
          if(this.usertype=="C"){
          this.cart[oa]["OrderStatus"]=1;
          }
          else{
            this.cart[oa]["ItemTotalAmout"]= (this.cart[oa].ItemQuantity *  this.cart[oa].Price)-( this.cart[oa].ItemDiscountAmount) ;
            this.cart[oa]["OrderStatus"]=2;
          }
          }
        let itemcount = 0;
        if(paymentmode>0){
          if(paymentmode==2){
            if(this.custuserid!=""){

              this.utils.presentLoading();
              if (this.cart.length > 0) {
                for (var o = 0; o < this.cart.length; o++) {
                     
                  this.cart[o]["userid"]=this.custuserid;
                  
                  }
               this.utils.ProductTransactions(this.cart ).subscribe((Response) => {
                  console.log(Response);
                  if (Response.ErrorCode > 0) {
                    //this.removeallcart();
                    
                    this.cart[0]["username"]=this.creditcustname;
                    this.cart[0]["phone"]=this.creditcustmobile;
                   this.cart[0]["billno"]=Response.BillNo;
                   


                   if(this.usertype!="C"){
                        
                        this.navCtrl.setRoot("NotificationsPage",this.cart);
                        
                   }
                   else{
                    this.utils.presentAlert("Success", "Thank you for placing order.");
                    if(this.usertype==="C"){
                      this.navCtrl.setRoot("CustomerorderPage");
                    
                    }
                    else{
                      this.navCtrl.setRoot("BookServicePage");
                    }
                //    this.navCtrl.setRoot("BookServicePage",this.cart);
                   }
                    this.utils.dismissLoading();
                  }
                  else {
                    this.utils.presentAlert("Oops", "Order Failed, Please try once");
          
                  }
                });
              }
            }
            else{
            this.registerObj = {
              UserType:"",
              UserID:'',
              Password: '',
              Email: '',
              //Pin: '',
              Phoneno:'',
              FullName:'',
            //  Address:'',
             // State:'',
              //Country:'',
             // City:'',
            }
        
            let UserRegisterData = {
              UserType:"C",
              FirstName: this.registerForm.value.FullName,
              Password:"",
              Gmail: this.registerForm.value.Email,
              MobileNo: this.registerForm.value.Phoneno,
              Address: this.registerForm.value.Address,
              State: "",
             Country: "",
             City:"",
             PinCode:"",
            }
            if(UserRegisterData.Gmail!="" && UserRegisterData.MobileNo!="" && UserRegisterData.Address!=""){
              this.utils.presentLoading();
              if (this.cart.length > 0) {
                this.authService.RegisterDetails(UserRegisterData).subscribe((UResponse) => {
                  if (UResponse.ErrorCode > 0) {
                    for (var o = 0; o < this.cart.length; o++) {
                     
                    this.cart[o]["userid"]=UResponse.UserID;
                    }
                    this.utils.ProductTransactions(this.cart).subscribe((Response) => {
                      console.log(Response);
                      if (Response.ErrorCode > 0) {
                       // this.removeallcart();
                    this.cart[0]["username"]=UserRegisterData.FirstName;
                    this.cart[0]["phone"]=UserRegisterData.MobileNo;
                    this.cart[0]["billno"]=Response.BillNo;

                        
                    if(this.usertype!="C"){
                        
                      this.navCtrl.setRoot("NotificationsPage",this.cart);
                      
                 }
                 else{
                  this.utils.presentAlert("Success", "Thank you for placing order.");
                
                  if(this.usertype==="C"){
                    this.navCtrl.setRoot("CustomerorderPage");
                  
                  }
                  else{
                    this.navCtrl.setRoot("BookServicePage");
                  }
                 }
                        
                        this.utils.dismissLoading();
                      }
                      else {
                        this.utils.presentAlert("Oops", "Order Failed, Please try once");
              
                      }
                    });
                  }
                });
              
                
              }
            }
            else{
              this.utils.presentAlert("Oops", "Please enter Email, Mobileno  and Address");

            }
          }
          }
          else{
            this.utils.presentLoading();
              if (this.cart.length > 0) {
               this.utils.ProductTransactions(this.cart).subscribe((Response) => {
                  console.log(Response);
                  // if (Response.ErrorCode > 0) {
                    
                    this.cart[0]["username"]="";
                    this.cart[0]["phone"]="";
                    this.cart[0]["billno"]=Response.BillNo;

                        
                    if(this.usertype!="C"){
                        
                      this.navCtrl.setRoot("NotificationsPage",this.cart);
                      
                 }
                 else{
                  this.utils.presentAlert("Success", "Thank you for placing order.");
                  if(this.usertype==="C"){
                    this.navCtrl.setRoot("CustomerorderPage");
                  
                  }
                  else{
                    this.navCtrl.setRoot("BookServicePage");
                  }
                 }
                    
                    this.utils.dismissLoading();
                  // }
                  // else {
                  //   this.utils.presentAlert("Oops", "Order Failed, Please try once");
          
                  // }
                });
              }
          }
       
      
      }
      else{
        this.utils.presentAlert("Oops", "Please select paymentmode.");

      }
    }
    onRegisterSubmit(){
      this.proceedtocheckout() ;
    }
    getCurrentLocation() {
      this.utils.presentLoading();

      this.locationDetails = [];
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };
      this.geolocation.getCurrentPosition().then((resp) => {
        
        this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
          .then((result: NativeGeocoderReverseResult[]) => {
            this.locationDetails.push(result[0])
            this.utils.dismissLoading();

           this.address=(result[0].subLocality + "," + result[0].subAdministrativeArea + "," + result[0].locality + "," + result[0].postalCode + "," + result[0].countryName)
          // this.sdfdsfsd(this.address,options);
          this.getadd(this.address);
          })
          .catch((error: any) => console.log(error));
      }).catch((error) => {
      });
    }
    getadd(address){
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };
      this.nativeGeocoder.forwardGeocode(address, options)
  .then((result: NativeGeocoderForwardResult[]) => {
  console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude)
  this.custlat=result[0].latitude;
  this.custlng=result[0].longitude;

  })
  .catch((error: any) => console.log(error));
    }


    locateCustomer() {
      let latitude = parseFloat('16.984010');
      let longitude = parseFloat('81.783510');
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
