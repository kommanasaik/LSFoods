import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookServiceProvider } from '../../providers/book-service/book-service';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import * as Moment from 'moment';

import { ReviewServiceProvider } from '../../providers/review-service/review-service';
import { BehaviorSubject } from 'rxjs';


@IonicPage()
@Component({
  selector: 'page-book-service',
  templateUrl: 'book-service.html',
})

/**
 * Manages all methods 
 */
export class BookServicePage {
  cart = [];
  hidden: boolean = true;
  signup = {
    state: 0
  }
  public contactList: FormArray;

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
  ) {
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
    if (this.customerflag == 'CC') {
      this.custhidden = true;
      this.customerdata = this.navParams.data.userdata;
      this.creditcustomerName = this.customerdata.UserName;
      this.creditmobileno = this.customerdata.MobileNo;
      this.customerid = this.customerdata.UserId;
    }

  }

  addNewInputField(val, items, i): void {
    this.itemProduct.push(items);
    this.itemProduct[i]["Amount"] = val.itemslist[0].Amount;
    this.itemProduct[i]["Weight"] = val.itemslist[0].WeightCount;
    console.log(this.itemProduct);
  }
  removeInputField(val, items): void {


  }
  ngOnInit() {

    this.refreshPage();

  }
  refreshPage() {
    // this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  initTechnologyFields(): FormGroup {
    return this._FB.group({
      Name: [''],
      ImageByteArray1: [''],
      WeightCount: ['', Validators.required],
      Amount: ['', Validators.required]
    });
  }
  get fData() {
    return this.form.get('itemslist') as FormArray;
  }
  onWeightChange(data, item, index) {
    let enterWt = 0, price = 0, finalprice = 0, finalgms = 0, disgms = 0, pid = '';
    enterWt = data;
    pid = item.get('ID').value;
    price = item.get('Price').value;
    if (item.get('Type').value == 1) {
      if (this.customerflag == "CC") {
        if (pid == "c60e4d02-7dbf-43c5-a6a9-d2f0c3212808") {

          // if(pid=="7cbdd613-f1a6-4790-8443-ef895a00006f" || pid=="c60e4d02-7dbf-43c5-a6a9-d2f0c3212808"){
          disgms = this.customerdata.disGrams;
          if (disgms > 1000) {
            finalgms = (enterWt * disgms) / 1000
            finalprice = finalgms * price;
            finalprice = Math.round(finalprice);


          }
          else {
            finalgms = enterWt * 1000 / disgms;
            finalprice = finalgms * price;
            finalprice = Math.round(finalprice);

          }
        }
        else {
          // finalgms = price / 1000;
          finalprice = price * enterWt;
          finalprice = Math.round(finalprice);

        }
      } else {
        //  finalgms = price / 1000;
        //   finalprice = finalgms * enterWt;
        //   finalprice=Math.round(finalprice);
        finalprice = price * enterWt;
        finalprice = Math.round(finalprice);
      }


    }
    else {
      finalprice = price * enterWt;
      finalprice = Math.round(finalprice);
    }
    const itr = this.searchresponse.filter((item) => {
      return (item.ID == pid)
    })


    itr[0]["Amount"] = Number(finalprice);
    itr[0]["WeightCount"] = Number(enterWt);
    const controlArray = <FormArray>this.form.get('itemslist');
    controlArray.controls[index].get('Amount').setValue(finalprice);
    this.pushItemonTextchange(itr[0]);
  }
  pushItemonTextchange(product) {
    let added = false;
    for (var i = 0; i < this.orginalProduct1.length; i++) {
      if (this.orginalProduct1[i].ID === product.ID) {
        this.orginalProduct1.splice(i, 1);
        added = false;
      }
    }
    if (!added) {
      this.orginalProduct1.push(product);
    }
    console.log(this.orginalProduct1);
  }
  onRateChange(data, item, index) {
    let enterprice = 0, weight = 0, finalprice = 0, finalweight = 0, price, pid;
    pid = item.get('ID').value;
    enterprice = data;
    weight = 1000;
    price = item.get('Price').value;
    finalprice = (enterprice / price);
    finalprice = Number(parseFloat(finalprice.toString()).toFixed(2));
    const controlArray = <FormArray>this.form.get('itemslist');
    controlArray.controls[index].get('WeightCount').setValue(finalprice);
    const itr = this.searchresponse.filter((item) => {
      return (item.ID == pid)
    })

    itr[0]["WeightCount"] = Number(finalprice);
    itr[0]["Amount"] = Number(enterprice);
    this.pushItemonTextchange(itr[0]);
  }
  onDiscountChange(data, item, index) {
    let enterdiscount = 0, pid = "", amt = 0;
    enterdiscount = data;
    pid = item.get('ID').value;
    amt = item.get('Amount').value;
    const itr = this.searchresponse.filter((item) => {
      return (item.ID == pid)
    })
    if (enterdiscount < amt) {

      itr[0]["ItemDiscountAmount"] = Number(enterdiscount);
      this.pushItemonTextchange(itr[0]);
    } else {
      const controlArray = <FormArray>this.form.get('itemslist');
      controlArray.controls[index].get('ItemDiscountAmount').setValue(0);
      this.utils.presentAlert("Oops", "Discount should be less than total amount.")

    }
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
  //   selectEmployee(emp) {
  //      this.catid = emp;
  //  //   this.catid=$event.toString();
  //     this.getProducts(this.catid);
  //   }
  ProductonChange($event) {
    this.utils.delallcart();
    

    let checkcond = false;
    this.form = this._FB.group({
      itemslist: this._FB.array([])
    });
    // this.catid="";
    this.catid = $event.toString();
    if(this.searchresponse.length>0){

      this.searchresponse = this.searchresponse.filter((cart) => {
        return (((cart.Amount) > 0) && (cart.WeightCount) > 0);
      });

    }
    this.getProducts(this.catid);
    
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
      



      
      const control = <FormArray>this.form.controls.itemslist;
      let disprice = 0;
      if (this.customerflag == "CC") {
        for (var i = 0; i < Response.length; i++) {
          if (Response[i].ParentID == "a8395b5d-241b-40e6-bbd0-00693b55c2dc") {
            this.CatagoryPrice = this.CatagoryPriceList[0].Price;
            console.log(this.CatagoryPrice);
            disprice = this.CatagoryPrice;
            if (this.customerdata.disPrice != "" && this.customerdata.disPrice != undefined) {
              Response[i].Price = disprice - this.customerdata.disPrice;
            } else {
              Response[i].Price = disprice;
            }
          }
        }
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
      this.searchresponse.forEach(x => {

        hhi = false;
        if (this.customerflag == "CC") {
          if (x.ID == 'c60e4d02-7dbf-43c5-a6a9-d2f0c3212808') {
            hhi = true;
          }

          else {
            hhi = false;
          }
        } else {
          hhi = false;

        }
        let obj = this._FB.group({
          Name: [x.Name],
          ImageByteArray1: ['http://stockapp.bashaproducts.co.in/Images/' + x.ImageByteArray1],
          // ImageByteArray1:[x.ImageByteArray1],

          Price: [x.Price],
          ID: [x.ID],
          ActualPrice: [x.Price],
          Type: [x.Weight],
          ParentID: [x.ParentID],
          WeightCount: [x.WeightCount],
          Amount: [x.Amount],
          hidden: [hhi],
          ItemDiscountAmount: [x.ItemDiscountAmount]
        });
        control.push(obj);
      })
      // }
      console.log(control);
      this.utils.dismissLoading();
    })
  }


  getItemslist(ev) {
    // Reset items back to all of the items
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      let ddda = [];
      ddda = this.searchresponse;
      this.orginalProduct = this.searchresponse.filter((item) => {
        return (item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      this.orginalProduct = ddda.filter(e => this.orginalProduct.indexOf(e) !== -1);
      console.log(this.orginalProduct);
      // for (let person of this.orginalProduct1) {
      //   this.orginalProduct.push(person);
      // }

      if (this.orginalProduct.length > 0) {
        this.responsecount = 1;

        this.form = this._FB.group({
          itemslist: this._FB.array([])
        });
        const control = <FormArray>this.form.controls.itemslist;
        this.orginalProduct.forEach(x => {
          let hhi;
          hhi = false;
          if (this.customerflag == "CC") {
            if (x.ID == 'c60e4d02-7dbf-43c5-a6a9-d2f0c3212808') {
              hhi = true;
            }

            else {
              hhi = false;
            }
          } else {
            hhi = false;

          }
          let obj = this._FB.group({
            Name: [x.Name],
            ImageByteArray1: ['http://stockapp.bashaproducts.co.in/Images/' + x.ImageByteArray1],
            // ImageByteArray1:[x.ImageByteArray1],

            Price: [x.Price],
            ID: [x.ID],
            ActualPrice: [x.Price],
            Type: [x.Weight],
            ParentID: [x.ParentID],
            WeightCount: [x.WeightCount],
            Amount: [x.Amount],
            hidden: [hhi],
            ItemDiscountAmount: [x.ItemDiscountAmount]
          });
          control.push(obj);
        })
      }
      else {
        this.form = this._FB.group({
          itemslist: this._FB.array([])
        });
        this.responsecount = 0;

      }
    }
    else {
      this.responsecount = 1;

      this.form = this._FB.group({
        itemslist: this._FB.array([])
      });
      const control = <FormArray>this.form.controls.itemslist;



      this.orginalProduct = this.searchresponse.filter(e => this.orginalProduct1.indexOf(e) === -1);
      console.log(this.orginalProduct);
      for (let person of this.orginalProduct1) {
        this.orginalProduct.push(person);
      }
      this.orginalProduct.forEach(x => {
        let hhi;
        hhi = false;
        if (this.customerflag == "CC") {
          if (x.ID == 'c60e4d02-7dbf-43c5-a6a9-d2f0c3212808') {
            hhi = true;
          }

          else {
            hhi = false;
          }
        } else {
          hhi = false;

        }
        let obj = this._FB.group({
          Name: [x.Name],
          ImageByteArray1: ['http://stockapp.bashaproducts.co.in/Images/' + x.ImageByteArray1],
          // ImageByteArray1:[x.ImageByteArray1],

          Price: [x.Price],
          ID: [x.ID],
          ActualPrice: [x.Price],
          Type: [x.Weight],
          ParentID: [x.ParentID],
          WeightCount: [x.WeightCount],
          Amount: [x.Amount],
          hidden: [hhi],
          ItemDiscountAmount: [x.ItemDiscountAmount]
        });
        control.push(obj);
      })
    }
    console.log(this.orginalProduct);
  }
  onCancel(ev) {

  }

  dateDiffInDays(date1, date2) {
    // round to the nearest whole number
    return Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
  }
  proceedtocheckout(val: any) {
    //let todaydate=Moment(new Date());
    let todaydate=this.dateDiffInDays(new Date(), new Date('July 20, 2021 03:24:00'));
  
    this.cart = val;

    this.cart = val.itemslist.filter((cart) => {
      return (((cart.Amount) > 0) && (cart.WeightCount) > 0);
    });
   
    console.log(this.cart);
    let itemeachdisc = 0;
    if (this.cart.length > 0) {
      let BillTotalAmout = 0;
      let discountamt = 0;
      let billitemquan = 0;
      for (var o = 0; o < this.cart.length; o++) {
        itemeachdisc=0;
        BillTotalAmout += (this.cart[o].Amount * 1) - (this.cart[o].ItemDiscountAmount);
        discountamt += (this.cart[o].ItemDiscountAmount * 1);
        billitemquan += (1);
        this.cart[o]["ProductID"] = this.cart[o].ID;

        // this.cart[o]["discount"] = this.cart[o].discount;
        if (this.customerflag == 'CC') {
          this.custhidden = true;
          this.customerdata = this.navParams.data.userdata;
          this.creditcustomerName = this.customerdata.UserName;
          this.creditmobileno = this.customerdata.MobileNo;
          this.customerid = this.customerdata.UserId;
        }
        if (this.customerflag == "CC") {
          this.cart[o]["UserID"] = this.customerid;
          this.cart[o]["mobileno"] = this.customerdata.MobileNo;
          this.cart[o]["flag"] = this.customerflag;
          this.cart[o]["cname"] = this.creditcustomerName;
          this.cart[o]["ItemDiscountAmount"] = 0;
        }
        else {
          this.cart[o]["UserID"] = this.cart[o].userid;
          this.cart[o]["mobileno"] = "";
          this.cart[o]["flag"] = "";
          if (this.cart[o]["ItemDiscountAmount"] > 0) {
            itemeachdisc = this.cart[o]["ItemDiscountAmount"];

          }
          else {
            this.cart[o]["ItemDiscountAmount"] = 0;
            itemeachdisc = 0;

          }

        }
        this.cart[o]["ItemQuantity"] = Number(1);
        this.cart[o]["ItemTotalAmout"] = Number((1) * (this.cart[o].Amount));
        this.cart[o]["BillTotalAmout"] = Number(this.cart.reduce((i, j) => (i + j.Amount * 1) - j.ItemDiscountAmount, 0));
        this.cart[o]["BillQuantity"] = Number(billitemquan);
        this.cart[o]["BillDiscountAmount"] = Number(discountamt);

        if (this.customerflag == "CC") {
          this.cart[o]["userid"] = this.customerid;


        }
        else {
          this.cart[o]["userid"] = localStorage.getItem('user_id');
        }


        this.cart[o]["Price"] = this.cart[o].Amount;

        this.cart[o]["Weight"] = Number(this.cart[o].WeightCount);
        this.cart[o]["PaymentType"] = "";
      }
      for (var oo = 0; oo < this.cart.length; oo++) {
        this.cart[oo]["BillTotalAmout"] = BillTotalAmout;
        this.cart[oo]["BillDiscountAmount"] = discountamt;

        this.cart[oo]["BillQuantity"] = billitemquan;
      }
      if (this.customerflag == 'CC') {
        this.custhidden = true;
        this.customerdata = this.navParams.data.userdata;
        this.creditcustomerName = this.customerdata.UserName;
        this.creditmobileno = this.customerdata.MobileNo;
        this.customerid = this.customerdata.UserId;
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
