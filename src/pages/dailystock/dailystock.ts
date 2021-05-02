import { Component,ViewChild,Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { BookServiceProvider } from '../../providers/book-service/book-service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the DailystockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dailystock',
  templateUrl: 'dailystock.html',
})
export class DailystockPage {
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
            this.headerTitle = "Save Daily Stock";
            this.RegisterValidation();

      
  }
  RegisterValidation() {
    this.productForm = this.fb.group({
      Code: ['', Validators.required],
      ProductName: ['', Validators.required],
     
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DailystockPage');
  }

  onProductSubmit() {
    this.registerObj = {
      Code:'',
      ProductName: '',
    
    }
    let ProductData;
      ProductData = {
        NoofKgsStock: this.productForm.value.ProductName,
        noofkgsflesh: this.productForm.value.Code,
        UserID:localStorage.getItem("user_id")
  
      }
      
    if (ProductData.Name != "" && ProductData.Code != "") {
      console.log(this.ProdcutName);
      this.bookService.SaveDailyStock(ProductData).subscribe((Response) => {
        console.log(Response);
        if (Response.ErrorCode > 0) {
         // this.navCtrl.setRoot("FaqPage");
         this.utils.presentAlert("Alert", "Daily stock saved.");
          this.RegisterValidation();
        }
        else {
          this.utils.presentAlert("Oops", "Please enter details");


        }
      });
 
    }
    else {
      this.utils.presentAlert("Oops", "Please enter details");

    }
  }
}
