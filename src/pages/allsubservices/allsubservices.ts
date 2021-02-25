import { Component,ViewChild,Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { BookServiceProvider } from '../../providers/book-service/book-service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the AllsubservicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-allsubservices',
  templateUrl: 'allsubservices.html',
})
export class AllsubservicesPage {
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
    public utils: UtilsServiceProvider
    ) {
    
      if(navParams.data.prodid!=undefined)
      {
      this.headerTitle = "Update Catagory";

        this.prodid=navParams.data.prodid;
        this.updtype='U';
        this.title='Update';
        this.bindData();
      }
      else{
      this.headerTitle = "Create Catagory";

        this.prodid=0;
        this.updtype="A";
        this.title='Create';
    
      }
      this.RegisterValidation();


  }
  bindData(){

    this.utils.presentLoading();
    this.utils.getproductcatagoryByid(this.prodid).subscribe((Response) => {
      if(Response.length<=0){
        this.utils.dismissLoading();
      }
      else{
        this.utils.dismissLoading();

        this.productForm.reset({
         Code:Response.Code,
         ProductName: Response.Name,
         Description: Response.Discription,
         Amount: Response.Amount
        })
      }
    });
  }
  RegisterValidation() {
    this.productForm = this.fb.group({
      Code: ['', Validators.required],
      ProductName: ['', Validators.required],
      Description: ['', Validators.required],
      Amount: ['', Validators.required],

    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AllsubservicesPage');

  }
  onProductSubmit() {
    this.registerObj = {
      Code:'',
      ProductName: '',
      Description: '',
      Amount: '',
    
    }
    let ProductData;
    if(this.updtype=="A"){
      ProductData = {
        Name: this.productForm.value.ProductName,
        Discription: this.productForm.value.Description,
        Code: this.productForm.value.Code,
        Amount: this.productForm.value.Amount,
  
      }
      
    }else{

       ProductData = {
        Name: this.productForm.value.ProductName,
        Discription: this.productForm.value.Description,
        Code: this.productForm.value.Code,
        Amount: this.productForm.value.Amount,
        ID:this.prodid
  
      }
      
    }
   
    if (ProductData.Name != "") {
      console.log(this.ProdcutName);
      if(this.updtype=="A"){
      this.bookService.AddCatagory(ProductData).subscribe((Response) => {
        console.log(Response);
        if (Response.ErrorCode > 0) {
          this.navCtrl.setRoot("FaqPage");
          
        }
        else {
          this.utils.presentAlert("Oops", "Please enter details");


        }
      });
    }else{
      this.bookService.UpdateCatagory(ProductData).subscribe((Response) => {
        console.log(Response);
        if (Response.ErrorCode > 0) {
          this.navCtrl.setRoot("FaqPage");
          
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
