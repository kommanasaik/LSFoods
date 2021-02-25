import { Component } from '@angular/core';
import { state } from '@angular/core/src/animation/dsl';
import { IonicPage, NavController, NavParams,AlertController,ModalController  } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { MinimumServicePaymentPage } from '../minimum-service-payment/minimum-service-payment';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {PrintProvider} from '../../providers/print/print';
@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})

/**
 * Manages all methods 
 */
export class NotificationsPage {
  selectedPrinter:any=[];
  myDate: String = new Date().toISOString();

  bluetoothList:any=[];


  /**
* Value of the header title
*/
  headerTitle;

  /**
*  Value of the notifications list
*/
  notificationsList: Array<any> = []
  cartItemCount: BehaviorSubject<number>;
  cart:any;
  totalbillamount:number;
  totalquantity:number;
    /**
  *  loads first when entering to the page 
  * initializing heaserTitle value
  */username:any;
  phone:any;

  constructor(
    public authService: AuthServiceProvider,
    public navCtrl: NavController,private fb: FormBuilder, public navParams: NavParams,
    public utils: UtilsServiceProvider,private modalCtrl:ModalController,
    private printProvider:PrintProvider,private alertCtrl:AlertController
  ) {
    this.headerTitle = "";
    if(navParams.data[0]==undefined){
      this.navCtrl.setRoot("BookServicePage");
    
          }else{
        //  this.cart= navParams.data;
    this.cart= this.utils.getCart();

            this.username=this.cart[0].username;
            this.phone=this.cart[0].phone;

          }
          
  }

    /**
  *  Fired after loading constructor
  *  calling getNotifications method
  */
  ionViewDidLoad() {
    if(this.cart.length>0){
      this.totalbillamount=this.cart[0].BillTotalAmout;
      this.totalquantity=this.cart[0].BillQuantity;
  }
}
print(){
  console.log('print');
  this.listBTDevice();
}
listBTDevice()
  {
    this.printProvider.searchBt().then(datalist=>{
      
      //1. Open printer select modal
      let abc=this.modalCtrl.create(MinimumServicePaymentPage,{data:datalist});
      
      //2. Printer selected, save into this.selectedPrinter
      abc.onDidDismiss(data=>{
        this.selectedPrinter=data;

        let xyz=this.alertCtrl.create({
          title: data.name+" selected",
          buttons:['Dismiss']
        });
        xyz.present();

      });
      
      //0. Present Modal
      abc.present();

    },err=>{
      console.log("ERROR",err);
      let mno=this.alertCtrl.create({
        title:"ERROR "+err,
        buttons:['Dismiss']
      });
      mno.present();
    })

  }

  testConnectPrinter()
  {
    var id=this.selectedPrinter.id;
    if(id==null||id==""||id==undefined)
    {
      //nothing happens, you can put an alert here saying no printer selected
    }
    else
    {
      let foo=this.printProvider.connectBT(id).subscribe(data=>{
        console.log("CONNECT SUCCESSFUL",data);

        let mno=this.alertCtrl.create({
          title:"Connect successful",
          buttons:['Dismiss']
        });
        mno.present();

      },err=>{
        console.log("Not able to connect",err);
        let mno=this.alertCtrl.create({
          title:"ERROR "+err,
          buttons:['Dismiss']
        });
        mno.present();
      });
    }
  }

  testPrinter()
  {
    var id=this.selectedPrinter.id;
    if(id==null||id==""||id==undefined)
    {
      //nothing happens, you can put an alert here saying no printer selected
    }
    else
    {
      let foo=this.printProvider.testPrint(id);
    }
  }
}
