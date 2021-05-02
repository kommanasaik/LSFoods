import { Component,Input } from '@angular/core';
import { state } from '@angular/core/src/animation/dsl';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { MinimumServicePaymentPage } from '../minimum-service-payment/minimum-service-payment';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { PrintProvider } from '../../providers/print/print';
import { PrinterProvider } from '../../providers/printer/printer';
import { Storage } from '@ionic/storage';

import { DatePipe } from '@angular/common';
import { PrinterDataProvider } from '../../providers/printer-data/printer-data';
@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})

/**
 * Manages all methods 
 */
export class NotificationsPage {
  selectedPrinter: any = [];
  myDate: String = new Date().toISOString();
cname:'';
  bluetoothList: any = [];
  defaultPrinter: string = "";

  /**
* Value of the header title
*/
  headerTitle;

  /**
*  Value of the notifications list
*/
  notificationsList: Array<any> = []
  cartItemCount: BehaviorSubject<number>;
  cart: any;
  totalbillamount: number;
  totalquantity: number;
    /**
  *  loads first when entering to the page 
  * initializing heaserTitle value
  */username: any;
  phone: any;
billno:any;
  constructor(
    public authService: AuthServiceProvider,
    public navCtrl: NavController, private fb: FormBuilder, public navParams: NavParams,
    public utils: UtilsServiceProvider, private modalCtrl: ModalController,
    //private printProvider:PrintProvider,
    private alertCtrl: AlertController,
    private storage: Storage
    ,
    private printer: PrinterProvider,
    public datepipe: DatePipe,
    private printerData: PrinterDataProvider,
  ) {
   
    this.headerTitle = "";
    if (navParams.data[0] == undefined) {
      this.navCtrl.setRoot("BookServicePage");

    } else {
      //  this.cart= navParams.data;
      this.cart = this.utils.getCart();
    if(this.cart.length>0){
      if(this.cart[0].flag=="CC"){
        this.cname=this.cart[0].cname;
      }
this.billno= this.cart[0].billno;
      this.username = this.cart[0].username;
      this.phone = this.cart[0].phone;
    }
    else{
      this.cart= navParams.data;
      this.billno= this.cart[0].billno;
this.myDate=this.cart[0].myDateDte;
    }
    }

    storage.get('default_print').then((val) => {
      this.defaultPrinter = val;
      //alert(this.defaultPrinter)
    });

  }

  /**
*  Fired after loading constructor
*  calling getNotifications method
*/
  ionViewDidLoad() {
    if (this.cart.length > 0) {
      this.totalbillamount = this.cart[0].BillTotalAmout;
      this.totalquantity = this.cart[0].BillQuantity;
    }
  }
 add3Dots(string, limit)
  {
    var dots = "...";
    if(string.length > limit)
    {
      // you can also use substr instead of substring
      string = string.substring(0,limit) + dots;
    }
  
      return string;
  }
  convertoweight(Weight,Type)
  {
    let convertstring="";
    if(Type==1){
    if(Weight<1){
      convertstring=Weight+"gm";
    }
    else{
      convertstring=Weight+"kg";
    }
  }
  else{
    convertstring=Weight;
  }
  return convertstring;
  }
  
  
  
  
  print() {
    //this.listBTDevice();
    //this.defaultPrinter = "1235";
    //alert(this.defaultPrinter)
    if (this.defaultPrinter != '') {
      //alert(this.defaultPrinter)
      //this.printerData.encoding = null;
      //const encoder = new EscPosEncoder();
      //const result =  encoder.initialize();
      //this.printerData.encoding = encoder;
      this.printerData.Initial();
      this.printerData.encoding.align('center')
        .bold()
        .line('LAKSHMI SARADA CHICKEN OUTLET')
        .bold(false)
        .line('Pantakaluva Road,')
        .line('Near Nagrjuna Hospital, Kanuru,')
        .line('Vijayawada. Andhra Pradesh')
        .line('Ph:94946 68768')
        .bold()
        .align('left')
        .text('#' +this.billno)
        .align('right')
        .newline()
        .text('Date:' + this.datepipe.transform(this.myDate, 'dd/MM/yyyy , h:mm a'))
        .align('left')
        .newline()
        .text(this.cname)
        .newline()
        .line('-------------------------------')
      this.printerData.tableCustom([
        { text: "Item Name", align: "LEFT" },
         { text: "Units", align: "CENTER" },
        //{ text: "Rate", align: "CENTER" },
        { text: "Price", align: "RIGHT" }
      ])
      this.printerData.encoding.line('-------------------------------');
      this.cart.forEach((item: any) => {
        let total = item.ItemQuantity * item.Price;
        let itemamount="";
        itemamount=item.ActualPrice+"kg";
        this.printerData.tableCustom([
          { text: this.add3Dots(item.Name,10), align: "LEFT" },
         { text:this.convertoweight(item.Weight,item.Type), align: "CENTER" },
      //  { text:item.Weight, align: "CENTER" },
          
          { text: parseFloat(total.toString()).toFixed(2), align: "RIGHT" }
        ])
      });
      this.printerData.encoding
        .line('-------------------------------')
        .align('right')
        .line('TOTAL AMOUNT: Rs. ' + parseFloat(this.cart[0].BillTotalAmout).toFixed(2))
        .line('-------------------------------')
        .cut();

      //alert(this.printerData.encoding)
      let printBytes = this.printerData.encode();
      // let mno = this.alertCtrl.create({
      //   title: JSON.stringify(printBytes),
      //   buttons: ['Dismiss']
      // });
      // mno.present();
      this.printer.messageTo(this.defaultPrinter, printBytes)
    } else {
      let mno = this.alertCtrl.create({
        title: "Set Default Printer ->menu->Printer Settings",
        buttons: ['Dismiss']
      });
      mno.present();
    }
  }


  // print(){
  //   console.log('print');
  //   this.listBTDevice();
  // }
  // listBTDevice()
  //   {
  //     this.printProvider.searchBt().then(datalist=>{

  //       //1. Open printer select modal
  //       let abc=this.modalCtrl.create(MinimumServicePaymentPage,{data:datalist});

  //       //2. Printer selected, save into this.selectedPrinter
  //       abc.onDidDismiss(data=>{
  //         this.selectedPrinter=data;

  //         let xyz=this.alertCtrl.create({
  //           title: data.name+" selected",
  //           buttons:['Dismiss']
  //         });
  //         xyz.present();

  //       });

  //       //0. Present Modal
  //       abc.present();

  //     },err=>{
  //       console.log("ERROR",err);
  //       let mno=this.alertCtrl.create({
  //         title:"ERROR "+err,
  //         buttons:['Dismiss']
  //       });
  //       mno.present();
  //     })

  //   }

  //   testConnectPrinter()
  //   {
  //     var id=this.selectedPrinter.id;
  //     if(id==null||id==""||id==undefined)
  //     {
  //       //nothing happens, you can put an alert here saying no printer selected
  //     }
  //     else
  //     {
  //       let foo=this.printProvider.connectBT(id).subscribe(data=>{
  //         console.log("CONNECT SUCCESSFUL",data);

  //         let mno=this.alertCtrl.create({
  //           title:"Connect successful",
  //           buttons:['Dismiss']
  //         });
  //         mno.present();

  //       },err=>{
  //         console.log("Not able to connect",err);
  //         let mno=this.alertCtrl.create({
  //           title:"ERROR "+err,
  //           buttons:['Dismiss']
  //         });
  //         mno.present();
  //       });
  //     }
  //   }

  //   testPrinter()
  //   {
  //     var id=this.selectedPrinter.id;
  //     if(id==null||id==""||id==undefined)
  //     {
  //       //nothing happens, you can put an alert here saying no printer selected
  //     }
  //     else
  //     {
  //       let foo=this.printProvider.testPrint(id);
  //     }
  //   }
}
