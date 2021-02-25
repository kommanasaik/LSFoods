import { Component,ViewChild,Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { BookServiceProvider } from '../../providers/book-service/book-service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the AllservicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-allservices',
  templateUrl: 'allservices.html',
})
export class AllservicesPage {
  @Input() options: any;
 
  signup={
    state:0
  }
  statelist:any;

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
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public bookService: BookServiceProvider, private fb: FormBuilder,
    public utils: UtilsServiceProvider
    
    ) {
    this.headerTitle = "Create Items";

    this.initializeItems();

  }

  ionViewDidLoad() {

  }
  getCatagories() {
    // this.utils.presentLoading();
    this.bookService.getCatagories().subscribe((Response) => {
      this.statelist=Response;
    });
  }
  
  initializeItems() {
    this.getCatagories();
    this.RegisterValidation();
   

  }
  RegisterValidation() {
    this.productForm = this.fb.group({
      City: ['', Validators.required],
      ProductName: ['', Validators.required],
      Weights: ['', Validators.required],
      Description: ['', Validators.required],
      Price: ['', Validators.required],
      Code: ['', Validators.required],
      catid: ['', Validators.required]


    });
  }
  onProductSubmit() {
    this.registerObj = {
      City:'',
      ProductName: '',
      Description: '',
      Price: '',
      ImageData: '',
      Weights:'',
      Code:'',
      catid:''

    }
    let ProductData = {
      ProductName: this.productForm.value.ProductName,
      Description: this.productForm.value.Description,
      Price: this.productForm.value.Price,
     Quantity:this.productForm.value.City,
     Units:this.productForm.value.Weights,
     ProductCode:this.productForm.value.Code,
     Type:this.productForm.value.catid


    }
    
    if (ProductData.ProductName != "") {
      console.log(this.ProdcutName);
      this.bookService.AddProducts(ProductData).subscribe((Response) => {
        console.log(Response);
        if (Response.ErrorCode > 0) {
          this.navCtrl.setRoot("ReviewsPage");
          
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

