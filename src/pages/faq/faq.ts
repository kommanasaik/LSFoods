import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { ServiceHistoryProvider } from '../../providers/service-history/service-history';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { AllsubservicesPage } from '../allsubservices/allsubservices';


@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})

/**
 * Manages all methods 
 */
export class FaqPage {
  reviewPageOptions;
  searchresponse:any;
  products:any;

  /**
* Value of the header title
*/
  headerTitle;
responsecount=0;
  
  /**
   * 
*  loads first when entering to the page 
*/
  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    public bookservice: ServiceHistoryProvider,
    public utils: UtilsServiceProvider,
) {
    this.headerTitle = "Catogory List";
    
    
  }

  ionViewDidLoad() {
    this.RegisterValidation();
  }
  RegisterValidation() {  
    this.utils.presentLoading();
       this.utils.getproductcatagory().subscribe((Response) => {
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

   gotoedit(prodid){
    let data={
      prodid:prodid,
      command:'U'
    }
    this.navCtrl.push("AllsubservicesPage",data)
  }

  opencatagorypage(){
    this.navCtrl.push("AllsubservicesPage");
    
  }
  
}
