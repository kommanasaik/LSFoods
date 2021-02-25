import { Component, ViewChild, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { BookServiceProvider } from '../../providers/book-service/book-service';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { Storage } from '@ionic/storage';
import { ReviewServiceProvider } from '../../providers/review-service/review-service';
import { BehaviorSubject } from 'rxjs';
import { BilldetailsPage } from '../billdetails/billdetails';
import { response } from 'express';


@IonicPage()
@Component({
  selector: 'page-book-service',
  templateUrl: 'book-service.html',
})

/**
 * Manages all methods 
 */
export class BookServicePage {
  @ViewChild('slider') slider: Slides;
  cart = [];
  hidden:boolean=true;
  signup={
    state:0
  }
  cartItemCount: BehaviorSubject<number>;
  slideIndex = 0;
  servicesserach = [];
  reviewsList: Array<any> = [];
  reviews = [];
  reviewopen: boolean;
  // reviewText=' Reliable and great service! Ryan and his crew know their stuff and can help you out especially with cracked screens.'
  /**
   * 
   * 
* Value of the header title
*/
  headerTitle;
  @Input() options: any;
  statelist:any;
 fromPage="";
  getProductResponse: any;
  searchresponse: any;
  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public navParams: NavParams,
    public bookService: BookServiceProvider,
    public utils: UtilsServiceProvider,
    public reviewService: ReviewServiceProvider,
  ) {

    this.headerTitle = "Book Order";
    this.fromPage= this.navParams.data.frompage;
    console.log( this.navParams);


  }

  /**
  *  Fired after loading constructor
  */
  ionViewDidLoad() {
    if(this.fromPage!="billpage"){
    this.utils.delallcart();
    this.cart= this.utils.getCart();
    }
   this.initializeItems();
  }


  initializeItems() {
    this.getCatagories();

   // this.getProducts();
  }
  
  getCatagories() {
    // this.utils.presentLoading();
    this.bookService.getCatagories().subscribe((Response) => {
      this.statelist=Response;
    });
  }
  selectEmployee(emp){
    this.hidden=true
    let catid=emp
    this.getProducts(catid);
}
  getProducts(catid) {
    this.utils.presentLoading();
    this.bookService.getProducts().subscribe((Response) => {
      this.getProductResponse = Response;
      this.searchresponse = Response;
      this.searchresponse = Response.filter((item) => {
        return ((item.ParentID) ==catid );
      });
      for (var is = 0; is < this.searchresponse.length; is++) {
        this.searchresponse[is]["count"]=0;

      }
      this.cart=this.utils.getCart();
      console.log(this.cart);
      if (this.cart.length > 0) {
        for (var i = 0; i < this.searchresponse.length; i++) {
          for (var j = 0; j < this.cart.length; j++) {
            if (this.searchresponse[i].ID === this.cart[j].ID) {
              this.searchresponse.splice(i, 1);

            }
            

          }

        }
        for (var k = 0; k < this.cart.length; k++) {
          this.searchresponse.push(this.cart[k]);
        }

        this.searchresponse.sort(function (a, b) {
          return a.ID - b.ID;
        });

      }
      else {
        if (this.searchresponse.length > 0) {
          for (var l = 0; l < this.searchresponse.length; l++) {
            this.searchresponse[l]["count"] = 0;
            this.searchresponse[l]["userid"] = localStorage.getItem('user_id');

          }
        }
      }
      //this.utils.delallcart();
      this.cart = this.searchresponse;
      this.searchresponse = this.searchresponse;
      console.log(this.cart);



      this.utils.dismissLoading();
    })
  }
  addToCart(product) {
    this.utils.addProduct(product);
    console.log(this.cart);
  }
  removecart(product) {
    if (product.count > 0) {
      this.utils.decProduct(product);
    }
  }
  gotodelete(product) {
    this.utils.removeProduct(product);
  }
  getItemslist(ev) {
    // Reset items back to all of the items
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.cart = this.cart.filter((item) => {
        return (item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else {
      this.cart = this.searchresponse

    }
  }
  onCancel(ev) {
    ev.target.value = '';
  }
  removeallcart() {
      this.utils.delallcart();
    }
  proceedtocheckout() {
   this.cart= this.utils.getCart();
   if(this.cart.length>0){
  let BillTotalAmout=0;
    let billitemquan=0;
   for (var o = 0; o < this.cart.length; o++) {
    BillTotalAmout+=(this.cart[o].Price * this.cart[o].count);
    billitemquan+=(this.cart[o].count);

    this.cart[o]["ProductID"] = this.cart[o].ID;
    this.cart[o]["UserID"] = this.cart[o].userid;
    this.cart[o]["ItemQuantity"] = this.cart[o].count;
    this.cart[o]["BillTotalAmout"] = this.cart.reduce((i, j) => i + j.price * j.count, 0);
  this.cart[o]["BillQuantity"] = billitemquan;
  this.cart[o]["userid"]=localStorage.getItem('user_id');


  }
  for(var oo=0;oo<this.cart.length;oo++){
    this.cart[oo]["BillTotalAmout"] =BillTotalAmout;
  this.cart[oo]["BillQuantity"] = billitemquan;

 // this.cart[o]["BillQuantity"] = billitemquan;

  }
  

          this.navCtrl.setRoot("BilldetailsPage",this.cart);
          
       
  
  }
  else{
    this.utils.presentAlert("Oops", "Cart is empty, please buy any product.")
    let catid="";
this.getProducts(catid);
  }
}
}
