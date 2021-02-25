import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { ServiceHistoryProvider } from '../../providers/service-history/service-history';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';


@IonicPage()
@Component({
  selector: 'page-reviews',
  templateUrl: 'reviews.html',
})

/**
 * Manages all methods 
 */
export class ReviewsPage {
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bookservice: ServiceHistoryProvider,
    public utils: UtilsServiceProvider,

  ) {
    this.headerTitle = "Items List";
  }
  ionViewDidLoad() {
    this.RegisterValidation();
  }
  onCancel(ev) {
    ev.target.value = '';
  }
  getItemslist(ev) {
    var val = ev.target.value;
  
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
  
      this.products = this.products.filter((item) => {
        return (item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1 );
      })
    
    }
    else
    {
      this.products=this.searchresponse
  
    }
  
  }
  RegisterValidation() {  
    this.utils.presentLoading();
       this.utils.getProducts().subscribe((Response) => {
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
  


}
