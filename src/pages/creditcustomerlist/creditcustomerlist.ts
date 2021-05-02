import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { ServiceHistoryProvider } from '../../providers/service-history/service-history';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';

/**
 * Generated class for the CreditcustomerlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-creditcustomerlist',
  templateUrl: 'creditcustomerlist.html',
})
export class CreditcustomerlistPage {
/**
* Value of the header title
*/
headerTitle;

/**
* Value of the searchType
*/
searchType = "Search Items";

/**
* Value of the reviewPageOptions
*/
reviewPageOptions;
searchresponse:any;
products:any;

/**
*  loads first when entering to the page 
* initializing heaserTitle value
*/
responsecount=0;

  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    public bookservice: ServiceHistoryProvider,
    public utils: UtilsServiceProvider,) {
    this.headerTitle = "Customer List";

  }
  gotoedit(prodid){
    let data={
      prodid:prodid,
      command:'U'
    }
    this.navCtrl.push("CreditcustomerPage",data)
  }
  
  opencatagorypage(){
    this.navCtrl.push("CreditcustomerPage");
    
  }
  RegisterValidation() {  
    this.utils.presentLoading();
       this.utils.getallcreditcustomers().subscribe((Response) => {
       console.log(Response);
       if(Response.length<=0){
       this.utils.dismissLoading();
       this.products=[]; 
this.responsecount=0;

       }
       else
       {
this.responsecount=1;

       if(Response!="")
       {
         this.products=Response;
         this.searchresponse=Response;
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
    console.log('ionViewDidLoad CreditcustomerlistPage');
    this.RegisterValidation();
  }

}
