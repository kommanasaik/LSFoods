import { Component,ViewChild,Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { BookServiceProvider } from '../../providers/book-service/book-service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
/**
 * Generated class for the CreditcustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-creditcustomer',
  templateUrl: 'creditcustomer.html',
})
export class CreditcustomerPage {
  @Input() options: any;
  
  ProdcutName: any;
  Description: any;
  Price: any;
  ResponseLoginData: any;
  productForm;
  registerObj: any;
  UserInfo: any;
  data:any;
  prodid:any;
  UserData:any;
  updtype:any;
  headerTitle:string;
  title:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public bookService: BookServiceProvider, private fb: FormBuilder,
    public utils: UtilsServiceProvider) {
      if(navParams.data.prodid!=undefined)
      {
      this.headerTitle = "Update";

        this.prodid=navParams.data.prodid;
        this.updtype='U';
        this.title='Update Customer';
        this.bindData();
      }
      else{
      this.headerTitle = "Create";

        this.prodid=0;
        this.updtype="A";
        this.title='Create Customer';
    
      }
      this.RegisterValidation();
  }
  bindData(){

    this.utils.presentLoading();
    this.utils.getcredituserprofile(this.prodid).subscribe((Response) => {
      if(Response.length<=0){
        this.utils.dismissLoading();
      }
      else{
        this.utils.dismissLoading();

        this.productForm.reset({
          CustomerName:Response.UserName,
          Address: Response.Address,
          phoneno: Response.MobileNo,
          mailid: Response.Gmail,
          openbal: Response.OutstandingAmount,
          discprice: Response.disPrice,
          weight: Response.disGrams
        })
      }
    });
  }
  RegisterValidation() {
    this.productForm = this.fb.group({
      CustomerName:['', Validators.required],
      Address: ['', Validators.required],
      phoneno: ['', Validators.required],
      mailid: ['', Validators.required],
      openbal: ['', Validators.required],
      discprice: ['', Validators.required],
      weight: ['', Validators.required]
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreditcustomerPage');
  }
  onProductSubmit() {
    this.registerObj = {
      CustomerName:'',
      Address: '',
      phoneno: '',
      mailid: '',
      openbal: '',
      discprice: 0,
      weight: 0
    
    }
    let ProductData;
    if(this.updtype=="A"){
      ProductData = {
        FirstName:this.productForm.value.CustomerName,
        Address: this.productForm.value.Address,
        MobileNo: this.productForm.value.phoneno,
        Gmail: this.productForm.value.mailid,
        OutstandingAmount: this.productForm.value.openbal,
        disPrice: this.productForm.value.discprice,
        disGrams: this.productForm.value.weight,
        UserType: 'CC',
        IsCreditCustomer:'Y',
        Password:''
      }
      
    }else{

       ProductData = {
        UserName:this.productForm.value.CustomerName,
        Gmail: this.productForm.value.mailid,
        MobileNo: this.productForm.value.phoneno,
        UserId:this.prodid,

        Address: this.productForm.value.Address,
        State: '',
        Country:'',
        City:'',
        Pincode:'',
        OutstandingAmount: this.productForm.value.openbal,
        disPrice: this.productForm.value.discprice,
        disGrams: this.productForm.value.weight,

      }
      
    }
   
    if (ProductData.disPrice>0 && ProductData.disGrams>0) {
      if(this.updtype=="A"){
      this.bookService.createcreditcustomer(ProductData).subscribe((Response) => {
        console.log(Response);
        if (Response.ErrorCode > 0) {
          this.navCtrl.setRoot("CreditcustomerlistPage");
          
        }
        else {
          this.utils.presentAlert("Oops", "Please enter details");


        }
      });
    }else{
      this.bookService.userprofileupdate(ProductData).subscribe((Response) => {
        console.log(Response);
        if (Response.ErrorCode > 0) {
          this.navCtrl.setRoot("CreditcustomerlistPage");
          
        }
        else {
          this.utils.presentAlert("Oops", "Please enter details");


        }
      });
    }
    }
    else {
      this.utils.presentAlert("Oops", "Please enter details");

    }
  }
}
