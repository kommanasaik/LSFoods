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
responsecount=0;

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
usertype:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public utils: UtilsServiceProvider,
  ) {
this.usertype=localStorage.getItem("UserType");
    if(this.usertype==="C"){
    this.headerTitle = "My orders";
    }else{

    this.headerTitle = "Customer orders";
      
    }
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
        this.responsecount=0;
      this.utils.dismissLoading();
      this.products=[]; 
      }
      else
      {
        this.responsecount=1;

      if(Response!="")
      {
        
        this.products=Response;
        this.searchresponse=Response;
        this.searchresponse.sort(function(a, b){
          return b.SeqNo - a.SeqNo;
      });
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
      Billno:OrderID.BillNo  ,

      OrdeDateStr:OrderID.OrdeDate,
      TotalAmount:OrderID.TotalAmount,
      CustomerName:OrderID.CustomerName  ,

      MobileNo:OrderID.Phoneno,
      Address:OrderID.address,
      
      latitude:OrderID.latitude,
      longitude:OrderID.longitude,
    }
    
    this.navCtrl.push("PaymentsHistoryPage",data);


  }
}
