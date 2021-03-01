import { Component } from '@angular/core';
import { state } from '@angular/core/src/animation/dsl';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { BookServicePage } from '../book-service/book-service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

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
];
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
  constructor(
      public authService: AuthServiceProvider,
      public navCtrl: NavController,private fb: FormBuilder, public navParams: NavParams,
      public utils: UtilsServiceProvider,
    ) {
      if(navParams.data[0]==undefined){
  this.navCtrl.setRoot("BookServicePage");

      }else{
      this.cart= navParams.data;
    this.RegisterValidation();

      }
      
console.log(this.cart);

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
  this.navCtrl.setRoot("BookServicePage",data);

    // this.navCtrl.setRoot("BookServicePage");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BilldetailsPage');
    
    if(this.cart.length>0){
    this.totalbillamount=this.cart[0].BillTotalAmout;
    this.totalquantity=this.cart[0].BillQuantity;
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
          if(emp==2){
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
      proceedtocheckout() {
        let custname=this.custname;
        let custmobile=this.custmobile;
        let paymentmode=0;
        paymentmode=this.signup.state;

        let itemcount = 0;
        if(paymentmode>0){
          if(paymentmode==2){
            if(this.custuserid!=""){

              this.utils.presentLoading();
              if (this.cart.length > 0) {
                for (var o = 0; o < this.cart.length; o++) {
                     
                  this.cart[o]["userid"]=this.custuserid;
                  }
               this.utils.ProductTransactions().subscribe((Response) => {
                  console.log(Response);
                  if (Response.ErrorCode > 0) {
                    //this.removeallcart();
                    
                    this.cart[0]["username"]=this.creditcustname;
                    this.cart[0]["phone"]=this.creditcustmobile;

                        
                        this.navCtrl.setRoot("NotificationsPage",this.cart);
                        
                    
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
                    this.utils.ProductTransactions().subscribe((Response) => {
                      console.log(Response);
                      if (Response.ErrorCode > 0) {
                       // this.removeallcart();
                    this.cart[0]["username"]=UserRegisterData.FirstName;
                    this.cart[0]["phone"]=UserRegisterData.MobileNo;

                        
                        this.navCtrl.setRoot("NotificationsPage",this.cart);
                        
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

                        
                        this.navCtrl.setRoot("NotificationsPage",this.cart);
                        
                    
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
}
