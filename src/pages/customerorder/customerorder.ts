import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookServiceProvider } from '../../providers/book-service/book-service';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import * as Moment from 'moment';
import { ReviewServiceProvider } from '../../providers/review-service/review-service';
import { BehaviorSubject } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
/**
 * Generated class for the CustomerorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customerorder',
  templateUrl: 'customerorder.html',
})
export class CustomerorderPage {
  cart = [];
  itemcart = [];

  hidden: boolean = true;
  signup = {
    state: 0
  }
  public contactList: FormArray;
  weightList=[];
  catid: any;
  capturedSnapURL: string = "../assets/images/icon.png"
  cartItemCount: BehaviorSubject<number>;
  slideIndex = 0;
  servicesserach = [];
  CatagoryPrice = 0;
  reviewsList: Array<any> = [];
  reviews = [];
  reviewopen: boolean;
  itemProduct: any = [];
  orginalProduct: any = [];
  orginalProduct1: any = [];

  public form: FormGroup;
  public formarr: FormArray
  headerTitle;
  @Input() options: any;
  statelist: any;
  responsecount = 1;
  currentSelected:any;

  fromPage = "";
  getProductResponse: any = {};
  searchresponse: any = [];
  CatagoryPriceList: any = [];

  itemchange: any = [];
  selectcat = "";

  customerid = '';
  customerdata: any;
  custhidden: boolean = false;
  customerflag = '';
  creditcustomerName = '';
  creditmobileno = '';
  usertype = '';
  searchTerm = '';
  public get someArray(): FormArray {
    return this.form.get('itemslist') as FormArray;
  }

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    private _FB: FormBuilder,

    public navParams: NavParams,
    public bookService: BookServiceProvider,
    public utils: UtilsServiceProvider,
    public reviewService: ReviewServiceProvider,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
  ) {
    this.weightList=[
      {
        Name:"250gm",
        Value:"0.250"
    },
    {
      Name:"500gm",
      Value:"0.500"
    },
    {
      Name:"1kg",
        Value:"1"
    },
    {
      Name:"2kg",
      Value:"2"
    },
    {
      Name:"5kg",
      Value:"5"
    },
    {
      Name:"10kg",
      Value:"10"
    },
  ]
    this.usertype = localStorage.getItem("UserType");
    this.form = this._FB.group({
      itemslist: this._FB.array([])
    });
    this.someArray.controls.forEach(
      control => {
        control.valueChanges.subscribe(
          () => {
            console.log(this.someArray.controls.indexOf(control)) // logs index of changed item in form array
          }
        )
      }
    )

    this.headerTitle = "Book Order";
    this.fromPage = this.navParams.data.frompage;
    console.log(this.navParams);
    this.customerflag = this.navParams.data.flag;
    

  }

  ngOnInit() {

  }

  /**
  *  Fired after loading constructor
  */
  ionViewDidLoad() {
    if (this.fromPage != "billpage") {
      this.utils.delallcart();
      this.cart = this.utils.getCart();
    }
    this.initializeItems();
  }


  initializeItems() {
    this.getCatagories();

    // this.getProducts();
  }

  getCatagories() {
    this.utils.presentcatLoading();
    this.bookService.getCatagories().subscribe((Response) => {
      this.statelist = Response;
      console.log(this.statelist);

      this.CatagoryPriceList = this.statelist.filter((item) => {
        return (item.ID == "a8395b5d-241b-40e6-bbd0-00693b55c2dc")
      })
      this.statelist.sort((a, b) => a.Value > b.Value ? 1 : -1)
      this.utils.dismissLoading();
    });




  }
  
  ProductonChange($event) {
    this.utils.delallcart();

    // this.catid="";
    this.catid = $event.toString();
    if(this.searchresponse.length>0){

      this.searchresponse = this.searchresponse.filter((cart) => {
        return ((cart.ItemQuantity)>0 || (cart.WeightCount) > 0);
      });

    }
    this.getProducts(this.catid);
    
  }
  removecart(product,index) {
    if(product.ItemQuantity>0){
      this.decProduct(product,index);
    }
    }
  addToCart(product,index) {
      this.addProduct(product,index);
      console.log(this.cart);
    }
    public addProduct(product,index){
      let prodid="",itemq=0;
      prodid = product.ID;
      itemq = product.ItemQuantity;
      
      let added = false;
      for (let p of this.itemcart) {
        if (p.ID === product.ID) {
          p.ItemQuantity += 1;
    
          added = true;
          break;
        }
      }
      if (!added) {
        product.ItemQuantity = 1;
        
        this.itemcart.push(product);
      }
      console.log(this.itemcart);
      this.searchresponse[index].ItemQuantity=itemq+1;
    // this.cartItemCount.next(this.cartItemCount.value + 1);
    }
   
   
    public decProduct(product,index){
      let prodid="",itemq=0;
      prodid = product.ID;
      itemq = product.ItemQuantity;
        for (var i = 0; i < this.itemcart.length; i++) {
        if (this.itemcart[i].ID === product.ID) {
          this.itemcart[i].ItemQuantity -= 1;
          if (this.itemcart[i].ItemQuantity == 0) {
            this.itemcart.splice(i, 1);
          }
        }
      }
      console.log(this.itemcart);
      this.searchresponse[index].ItemQuantity=itemq-1;
    }
  getProducts(catid) {
    let dd = {};
    //this.searchresponse=[];
    this.getProductResponse = [];
    this.utils.presentLoading();
    this.bookService.getProductsbycatid(catid).subscribe((Response) => {
      this.hidden = false;
      // this.form = this._FB.group({
      //   itemslist: this._FB.array([])
      // });
      if (Response.length > 0) {
        this.responsecount = 1;
      }
      else {
        this.responsecount = 0;
      }
      

      for (var i = 0; i < Response.length; i++){
        Response[i]["ItemQuantity"]=0;
      }

    
      console.log(Response);
      this.getProductResponse = Response;
      
      this.getProductResponse.sort((a, b) => a.Name > b.Name ? 1 : -1)
      if (this.searchresponse.length == 0) {
        this.searchresponse = (this.getProductResponse);
      }
      else {
        for (let person of this.getProductResponse) {
          this.searchresponse.push(person);
        }

      }

      
     
      this.cart = this.utils.getCart();
      this.cart = this.searchresponse;
      this.orginalProduct = this.searchresponse;
      console.log(this.searchresponse);
      this.itemchange = this.searchresponse;
      // this.getProductResponse.push(this.searchresponse);
      //a8395b5d-241b-40e6-bbd0-00693b55c2dc
      let hhi = false;
      
 
    this.searchresponse =this.searchresponse.filter((thing, index, self) =>
    index === self.findIndex((t) => (
      t.ID === thing.ID 
    ))
  )

      console.log(this.searchresponse)
    
      // }
      this.utils.dismissLoading();
    })
  }
  onWeightChange(data, index,ev) {
let enterWt = 0, price = 0, finalprice = 0, finalgms = 0, disgms = 0, pid = '';
    enterWt = ev;
    pid = data.ID;
    price = data.Price;

    finalprice = price * enterWt;
    const itr = this.searchresponse.filter((item) => {
      return (item.ID == pid)
    })
        finalprice = Math.round(finalprice);

    //     itr[0]["Amount"] = Number(finalprice);
    //     itr[0]["WeightCount"] = Number(enterWt);
    //     const controlArray = <FormArray>this.form.get('itemslist');
    // controlArray.controls[index].get('Amount').setValue(finalprice);
    this.searchresponse[index].Amount=Number(finalprice);
    this.searchresponse[index].WeightCount=Number(enterWt);
    
        let added = false;
        for (var i = 0; i < this.orginalProduct1.length; i++) {
          if (this.orginalProduct1[i].ID === itr[0].ID) {
            this.orginalProduct1.splice(i, 1);
            added = false;
          }
        }
        if (!added) {
          this.orginalProduct1.push(itr[0]);
        }
        console.log(this.orginalProduct1);
  }
  
  dateDiffInDays(date1, date2) {
    // round to the nearest whole number
    return Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
  }
  proceedtocheckout() {

    // this.cart = val;
    let todaydate=this.dateDiffInDays(new Date(), new Date('June 20, 2021 03:24:00'));
     if(todaydate>0){
    this.cart = this.searchresponse.filter((cart) => {
      return ((cart.WeightCount) > 0 || (cart.ItemQuantity>0));
    });
   

    console.log(this.cart);
    let itemeachdisc = 0;
    if (this.cart.length > 0) {
      let BillTotalAmout = 0;
      let discountamt = 0;
      let billitemquan = 0;
      for (var o = 0; o < this.cart.length; o++) {
        itemeachdisc=0;
        discountamt += (this.cart[o].ItemDiscountAmount * 1);
        this.cart[o]["ProductID"] = this.cart[o].ID;
        this.cart[o]["Type"] = this.cart[o].Weight;

        this.cart[o]["ActualPrice"] = this.cart[o].Price;
        if(this.cart[o]["Type"]==2){
        BillTotalAmout += (this.cart[o].ActualPrice * this.cart[o]["ItemQuantity"]) - (0);       

        this.cart[o]["ItemQuantity"] =this.cart[o].ItemQuantity;
        this.cart[o]["Weight"] = this.cart[o]["ItemQuantity"];
        billitemquan += (this.cart[o]["ItemQuantity"]);

        }
        else{
        if(this.cart[o]["ItemQuantity"]>0)  {

          this.cart[o]["ItemQuantity"] =this.cart[o].ItemQuantity; 
        BillTotalAmout += (this.cart[o].ActualPrice * this.cart[o].WeightCount *  this.cart[o]["ItemQuantity"]) - (0);       
        this.cart[o]["Weight"] = this.cart[o].WeightCount *  this.cart[o]["ItemQuantity"];
        billitemquan += (this.cart[o].WeightCount *  this.cart[o]["ItemQuantity"]);

        }
        else{
        this.cart[o]["ItemQuantity"] =1;
        BillTotalAmout += (this.cart[o].ActualPrice * this.cart[o].WeightCount *  this.cart[o]["ItemQuantity"]) - (0);       
        this.cart[o]["Weight"] = this.cart[o].WeightCount *  this.cart[o]["ItemQuantity"];
        billitemquan += (this.cart[o].WeightCount *  this.cart[o]["ItemQuantity"]);

        }
        }
        this.cart[o]["Price"] = this.cart[o].ActualPrice;
        this.cart[o]["Amount"] = this.cart[o].ActualPrice;
          this.cart[o]["UserID"] = this.cart[o].userid;          
         
        this.cart[o]["ItemTotalAmout"] = Number((1) * (this.cart[o].Amount));
        this.cart[o]["BillTotalAmout"] = Number(this.cart.reduce((i, j) => (i + j.Amount * 1) - j.ItemDiscountAmount, 0));
        this.cart[o]["BillQuantity"] = Number(billitemquan);
        this.cart[o]["BillDiscountAmount"] = Number(discountamt);



     
          this.cart[o]["userid"] = localStorage.getItem('user_id');


        


     //   this.cart[o]["Weight"] = Number(this.cart[o].WeightCount);
        this.cart[o]["PaymentType"] = "";
      }
      for (var oo = 0; oo < this.cart.length; oo++) {
        

        this.cart[oo]["BillTotalAmout"] = BillTotalAmout;
        this.cart[oo]["BillDiscountAmount"] = discountamt;

        this.cart[oo]["BillQuantity"] = billitemquan;
      }
    
      this.navCtrl.setRoot("BilldetailsPage", this.cart);
    }
    else {
      this.utils.presentAlert("Oops", "Cart is empty, please buy any product.")
      // let catid="";
      this.getProducts(this.catid);
    }
    }
  }
  
}