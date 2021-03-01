import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceHistoryProvider } from '../../providers/service-history/service-history';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';


/**
 * Generated class for the SingleentryitemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-singleentryitem',
  templateUrl: 'singleentryitem.html',
})
export class SingleentryitemPage {
  headerTitle:any;
  cartItemCount: BehaviorSubject<number>;

  public form 			: FormGroup;
  products:any;
  enteramount:number=0;
  catid;
  signup={
    state:0
  }
  statelist:any;
  cart = [];

  constructor( public navCtrl 		: NavController, 
    public navParams 	: NavParams,
    private _FB          : FormBuilder,
    public historyService: ServiceHistoryProvider,
    public utils: UtilsServiceProvider) {
    this.headerTitle="Single Item entry";
    this.form = this._FB.group({
      technologies     : this._FB.array([
         this.initTechnologyFields()
      ])
   });
   this.cart=[];
    this.RegisterValidation();

  }
  initTechnologyFields() : FormGroup
  {
     return this._FB.group({
      Name 		: ['', Validators.required],
      Price 		: ['', Validators.required]

     });
  }


  addNewInputField() : void
  {
     const control = <FormArray>this.form.controls.technologies;
     control.push(this.initTechnologyFields());
  }
  selectEmployee(emp){
    this.catid=emp
 
   
}

  removeInputField(i : number) : void
   {
      const control = <FormArray>this.form.controls.technologies;
      control.removeAt(i);
      
   }

   manage(val : any) : void
   {
    this.cart=[];
     let prodname="";
     let prod;
      console.dir(val);
   // this.cart= this.utils.getCart();

      this.cart=val.technologies;
      
      for (var o = 0; o < this.cart.length; o++) {

        prod = this.products.filter((item) => {
          return ((item.ID==this.cart[o].Name) );
        });
        prodname=prod[0].Value;
        this.cart[o]["ProductID"] = this.cart[o].Name;
        this.cart[o]["ID"] = this.cart[o].Name;
        this.cart[o]["Code"] = "";
        this.cart[o]["Price"] = Number(this.cart[o].Price);
        this.cart[o]["Quantity"] =1;
        this.cart[o]["Code"] = 0;
        this.cart[o]["AfterTaxProice"] = 0;
        this.cart[o]["Units"] = 0;
        this.cart[o]["UnitsString"] = "";
        this.cart[o]["ImageByteArray"] = "";
        this.cart[o]["ImageByteArray1"] = "";
        this.cart[o]["ParentID"] =this.cart[o].Name;
        this.cart[o]["count"] = Number(this.cart.length);
        this.cart[o]["Name"] = prodname;
        this.cart[o]["UserID"] =localStorage.getItem('user_id');
        this.cart[o]["userid"] =localStorage.getItem('user_id');
        this.cart[o]["ItemQuantity"] =1;
        this.cart[o]["ItemTotalAmount"] =Number(this.cart[o].Price);
        this.cart[o]["BillTotalAmout"] =Number(this.cart.reduce((i, j) => i + j.Price * 1, 0));
        this.cart[o]["BillQuantity"] = Number(this.cart.length);

      }

      console.log(this.cart);
      this.navCtrl.setRoot("BilldetailsPage",this.cart);

   }



  RegisterValidation() {  
    this.utils.presentLoading();
       this.utils.getproductcatagory().subscribe((Response) => {
       console.log(Response);
       if(Response.length<=0){
       this.utils.dismissLoading();
       this.products=[]; 
       }
       else
       {
       if(Response!="")
       {
         this.products=Response;
     
       console.log(this.products);
       this.utils.dismissLoading();
       }
       else
       {
         this.utils.dismissLoading();      }
     }
     });
   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SingleentryitemPage');
  }
 

}
