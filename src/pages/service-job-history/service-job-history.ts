import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';


@IonicPage()
@Component({
  selector: 'page-service-job-history',
  templateUrl: 'service-job-history.html',
})

/**
 * Manages all methods 
 */
export class ServiceJobHistoryPage {

  /**
 * defining reviewForm
 */

  /**
* Value of the header title
*/
  headerTitle;

  /**
* Value of the serviceHistoryData
*/
  serviceHistoryData: Array<any> = [];

  /**
* defining showReviewForm
*/
  showReviewForm: boolean;

  /**
* Value of the selectedService
*/
  selectedService: Array<any> = [];

  /**
* Value of the searchType
*/
  searchType = "current";
  searchresponse:any;
  /**
*  loads first when entering to the page 
* initializing headerTitle value
* initializing reviewForm 
* validating reviewForm
*/
products:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public utils: UtilsServiceProvider,
  ) {
    this.headerTitle = "My orders";

    //this.RegisterValidation();
 
  }
  ionViewDidLoad() {
    this.RegisterValidation();
  }
  RegisterValidation() {  
   this.utils.presentLoading();
      this.utils.getmyorders().subscribe((Response) => {
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
 
  navigateViewpage(OrderID)
  {
    let data={
      OrderID:OrderID.OrderID  ,
      OrdeDateStr:OrderID.OrdeDateStr,
      TotalAmount:OrderID.TotalAmount
    }
    this.navCtrl.setRoot("PaymentsHistoryPage",data);


  }
}
