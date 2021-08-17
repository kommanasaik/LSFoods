import { Component, ViewChild,Input } from '@angular/core';
import { Nav, Platform,App,IonicApp,AlertController,MenuController ,Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm';
import { NetworkServiceProvider } from '../providers/network-service/network-service';
import { UtilsServiceProvider } from '../providers/utils-service/utils-service';

@Component({
  templateUrl: 'app.html',
  selector: 'app-sendertravelerdata'

})

/**
 * Manages all methods
 */
export class MyApp {
  @Input('LoginRole') LoginRole?


  /**
 * Accessing html page
 */
  @ViewChild(Nav) nav: Nav;

  /**
* Value of the rootPage
*/
  rootPage: any;

  /**
* declaring pages
*/
  pages: Array<{ title: string, component: any, icon: any ,sublist:any,menuclose:any}>;
  cart = [];

  /**
* Value of the AppLogo
*/
AppLogo = 'assets/images/sidemenu-logo.png';
usertype:any;
UserName:any='';
  /**
*  loads first when entering to the page
*  getting stored values in the app
*  navigating to perticular page conditionally
*/
showLevel1 = null;
showLevel2 = null;
rsublist:any;
lsublist:any;  rshowSubmenu: boolean = false;  lshowSubmenu: boolean = false;
  constructor(
    public app: App,

    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    // public storage: Storage,
    public fcm: FCM,
    public networkService: NetworkServiceProvider,
    public utils: UtilsServiceProvider
    ,public ionicApp: IonicApp,
    public alertCtrl: AlertController,
    public menuCtrl:MenuController,
    public events: Events,

  ) {
    this.usertype=localStorage.getItem("UserType");
    this.UserName=localStorage.getItem("user_name");


    this.events.subscribe('my-message', (data) =>{
    //  if(data=="C"){
    //   this.pages = [
    //         { title: 'Book Order', component: "BookServicePage", icon: "ios-basket" },
    //         { title: 'My Orders', component: "ServiceJobHistoryPage", icon: "ios-basket" },
    //         { title: 'Logout', component: "LoginPage", icon: "md-log-out" },
    //       ];
    //     }else if(data=="S"){
    //       this.pages = [
    //         { title: 'Book Order', component: "BookServicePage", icon: "ios-basket",sublist:"N" },
    //         { title: 'My Orders', component: "ServiceJobHistoryPage", icon: "ios-basket" },
    //         { title: 'Credit Customer Entry', component: "CustomerwiseentryPage", icon: "ios-basket" },
    //         { title: 'Create Staff', component: "StaffPage", icon: "logo-buffer" },
    //         { title: 'Credit Customer List', component: "CreditcustomerlistPage", icon: "logo-buffer" },
    //         { title: 'Items List', component: "ReviewsPage", icon: "ios-color-filter" },
    //         { title: 'Catagory List', component: "FaqPage", icon: "logo-buffer" },
    //         { title: 'Daily Stock', component: "DailystockPage", icon: "ios-basket" },
    //         { title: 'Payments', component: "GoogelmapPage", icon: "card" },

    //         { title: 'Sales Reports', component: "ScheduleJobPage", icon: "card" },
    //         { title: 'Item by Sales Reports', component: "SalesreportbycatPage", icon: "card" },
    //         { title: 'Payment Type Reports', component: "CredcustomerpaymentreportPage", icon: "card" },
    //         { title: 'Credit Customer Reports', component: "CredcustomerreportPage", icon: "card" },
    //         { title: 'Purchase Reports', component: "PurchasereportPage", icon: "card" },

    //         { title: 'DayEnd Sales', component: "ServiceContactPage", icon: "card" },
    //         { title: 'Printer Setting', component: "PrinterSettingsPage", icon: "settings" },
    //         { title: 'Logout', component: "LoginPage", icon: "md-log-out" },
    //       ];
    //     }
    if(data=="C"){
      this.pages = [
        { title: 'Book Order', component: "CustomerorderPage", icon: "ios-basket",sublist:"N" ,menuclose:"menuClose"},
        { title: 'My Orders', component: "ServiceJobHistoryPage", icon: "ios-basket",sublist:"N",menuclose:"menuClose" },
        { title: 'Logout', component: "LoginPage", icon: "md-log-out",sublist:"N",menuclose:"menuClose" },
          ];
        }
        else if(data=="A"){
          this.pages = [
            { title: 'Book Order', component: "BookServicePage", icon: "ios-basket",sublist:"N",menuclose:"menuClose" },
            { title: 'Customer Orders', component: "ServiceJobHistoryPage", icon: "ios-basket",sublist:"N",menuclose:"menuClose" },
            { title: 'Credit Customer Entry', component: "CustomerwiseentryPage", icon: "ios-basket",sublist:"N",menuclose:"menuClose" },
           // { title: 'Create Staff', component: "StaffPage", icon: "logo-buffer",sublist:"N",menuclose:"menuClose" },
            { title: 'Lists', component: "Lists", icon: "md-list",sublist:"L",menuclose:"" },
           
            { title: 'Daily Stock', component: "DailystockPage", icon: "ios-basket",sublist:"N",menuclose:"menuClose" },
            { title: 'Payments', component: "GoogelmapPage", icon: "card",sublist:"N",menuclose:"menuClose" },
          
            { title: 'Reports', component: "Reports", icon: "ios-albums",sublist:"R",menuclose:"" },
            { title: 'DayEnd Sales', component: "ServiceContactPage", icon: "card",sublist:"N",menuclose:"menuClose" },
            { title: 'Printer Setting', component: "PrinterSettingsPage", icon: "settings",sublist:"N",menuclose:"menuClose" },
            // { title: 'Profile', component: "ProfilePage", icon: "md-person",sublist:"N",menuclose:"menuClose" },
            { title: 'Logout', component: "LoginPage", icon: "md-log-out",sublist:"N",menuclose:"menuClose" },
          ];
          this.rsublist=[
            { title: 'Sales Reports', component: "ScheduleJobPage", icon: "ios-albums",sublist:"R",menuclose:"menuClose" },
            { title: 'Item by Sales Reports', component: "SalesreportbycatPage", icon: "ios-albums",sublist:"R",menuclose:"menuClose" },
            { title: 'Payment Type Reports', component: "CredcustomerpaymentreportPage", icon: "ios-albums",sublist:"R",menuclose:"menuClose" },
            { title: 'Credit Customer Reports', component: "CredcustomerreportPage", icon: "ios-albums",sublist:"R",menuclose:"menuClose" },
            { title: 'Purchase Reports', component: "PurchasereportPage", icon: "ios-albums",sublist:"R",menuclose:"menuClose" },]
        
        this.lsublist=[
          { title: 'Credit Customer List', component: "CreditcustomerlistPage", icon: "md-list",sublist:"L",menuclose:"menuClose" },
          { title: 'Staff List', component: "StafflistPage", icon: "md-list",sublist:"L",menuclose:"menuClose" },

          { title: 'Items List', component: "ReviewsPage", icon: "md-list",sublist:"L",menuclose:"menuClose" },
          { title: 'Catagory List', component: "FaqPage", icon: "md-list",sublist:"L",menuclose:"menuClose" },
        ]
        }
        else if(data=="S"){
          this.pages = [
            { title: 'Book Order', component: "BookServicePage", icon: "ios-basket",sublist:"N",menuclose:"menuClose" },
            { title: 'Customer Orders', component: "ServiceJobHistoryPage", icon: "ios-basket",sublist:"N",menuclose:"menuClose" },
            { title: 'Credit Customer Entry', component: "CustomerwiseentryPage", icon: "ios-basket",sublist:"N",menuclose:"menuClose" },
          //  { title: 'Create Staff', component: "StaffPage", icon: "logo-buffer",sublist:"N",menuclose:"menuClose" },
            { title: 'Lists', component: "Lists", icon: "md-list",sublist:"L",menuclose:"" },
           
            { title: 'Daily Stock', component: "DailystockPage", icon: "ios-basket",sublist:"N",menuclose:"menuClose" },
            { title: 'Payments', component: "GoogelmapPage", icon: "card",sublist:"N",menuclose:"menuClose" },
          
            { title: 'Reports', component: "Reports", icon: "ios-albums",sublist:"R",menuclose:"" },
            { title: 'DayEnd Sales', component: "ServiceContactPage", icon: "card",sublist:"N",menuclose:"menuClose" },
            { title: 'Printer Setting', component: "PrinterSettingsPage", icon: "settings",sublist:"N",menuclose:"menuClose" },
            { title: 'Logout', component: "LoginPage", icon: "md-log-out",sublist:"N",menuclose:"menuClose" },
          ];
          this.rsublist=[
            { title: 'Sales Reports', component: "ScheduleJobPage", icon: "ios-albums",sublist:"R",menuclose:"menuClose" },
            { title: 'Item by Sales Reports', component: "SalesreportbycatPage", icon: "ios-albums",sublist:"R",menuclose:"menuClose" },
            { title: 'Payment Type Reports', component: "CredcustomerpaymentreportPage", icon: "ios-albums",sublist:"R",menuclose:"menuClose" },
            { title: 'Credit Customer Reports', component: "CredcustomerreportPage", icon: "ios-albums",sublist:"R",menuclose:"menuClose" },
            { title: 'Purchase Reports', component: "PurchasereportPage", icon: "ios-albums",sublist:"R",menuclose:"menuClose" },]
        
        this.lsublist=[
          { title: 'Credit Customer List', component: "CreditcustomerlistPage", icon: "md-list",sublist:"L",menuclose:"menuClose" },
          { title: 'Items List', component: "ReviewsPage", icon: "md-list",sublist:"L",menuclose:"menuClose" },
          { title: 'Catagory List', component: "FaqPage", icon: "md-list",sublist:"L",menuclose:"menuClose" },
        ]
        }
    });
    this.initializeApp();

      if(localStorage.getItem("user_id")!="" && localStorage.getItem("user_id")!=null){
        if(this.usertype==="C"){
          // this.navCtrl.setRoot("CustomerorderPage");
          this.rootPage = "CustomerorderPage"
        }
        else{
          this.rootPage = "BookServicePage"
        }
        
      }
      else{
        this.rootPage = "IntroductionSliderPage"
      }
if(this.usertype=="C"){
  this.pages = [
        { title: 'Book Order', component: "CustomerorderPage", icon: "ios-basket",sublist:"N" ,menuclose:"menuClose"},
        { title: 'My Orders', component: "ServiceJobHistoryPage", icon: "ios-basket",sublist:"N",menuclose:"menuClose" },
        { title: 'Logout', component: "LoginPage", icon: "md-log-out",sublist:"N",menuclose:"menuClose" },
      ];
    }
    else if(this.usertype=="A"){
      this.pages = [
        { title: 'Book Order', component: "BookServicePage", icon: "ios-basket",sublist:"N",menuclose:"menuClose" },
        { title: 'Customer Orders', component: "ServiceJobHistoryPage", icon: "ios-basket",sublist:"N",menuclose:"menuClose" },
        { title: 'Credit Customer Entry', component: "CustomerwiseentryPage", icon: "ios-basket",sublist:"N",menuclose:"menuClose" },
        //{ title: 'Create Staff', component: "StaffPage", icon: "logo-buffer",sublist:"N",menuclose:"menuClose" },
        { title: 'Lists', component: "Lists", icon: "md-list",sublist:"L",menuclose:"" },
       
        { title: 'Daily Stock', component: "DailystockPage", icon: "ios-basket",sublist:"N",menuclose:"menuClose" },
        { title: 'Payments', component: "GoogelmapPage", icon: "card",sublist:"N",menuclose:"menuClose" },
      
        { title: 'Reports', component: "Reports", icon: "ios-albums",sublist:"R",menuclose:"" },
        { title: 'DayEnd Sales', component: "ServiceContactPage", icon: "card",sublist:"N",menuclose:"menuClose" },
        { title: 'Printer Setting', component: "PrinterSettingsPage", icon: "settings",sublist:"N",menuclose:"menuClose" },
        // { title: 'Profile', component: "ProfilePage", icon: "md-person",sublist:"N",menuclose:"menuClose" },

        { title: 'Logout', component: "LoginPage", icon: "md-log-out",sublist:"N",menuclose:"menuClose" },
      ];
      this.rsublist=[
        { title: 'Sales Reports', component: "ScheduleJobPage", icon: "ios-albums",sublist:"R",menuclose:"menuClose" },
        { title: 'Item by Sales Reports', component: "SalesreportbycatPage", icon: "ios-albums",sublist:"R",menuclose:"menuClose" },
        { title: 'Payment Type Reports', component: "CredcustomerpaymentreportPage", icon: "ios-albums",sublist:"R",menuclose:"menuClose" },
        { title: 'Credit Customer Reports', component: "CredcustomerreportPage", icon: "ios-albums",sublist:"R",menuclose:"menuClose" },
        { title: 'Purchase Reports', component: "PurchasereportPage", icon: "ios-albums",sublist:"R",menuclose:"menuClose" },]
    
    this.lsublist=[
      { title: 'Credit Customer List', component: "CreditcustomerlistPage", icon: "md-list",sublist:"L",menuclose:"menuClose" },
      { title: 'Staff List', component: "StafflistPage", icon: "md-list",sublist:"L",menuclose:"menuClose" },
      
      { title: 'Items List', component: "ReviewsPage", icon: "md-list",sublist:"L",menuclose:"menuClose" },
      { title: 'Catagory List', component: "FaqPage", icon: "md-list",sublist:"L",menuclose:"menuClose" },
    ]
  }
  else if(this.usertype=="S"){
    this.pages = [
      { title: 'Book Order', component: "BookServicePage", icon: "ios-basket",sublist:"N",menuclose:"menuClose" },
      { title: 'Customer Orders', component: "ServiceJobHistoryPage", icon: "ios-basket",sublist:"N",menuclose:"menuClose" },
      { title: 'Credit Customer Entry', component: "CustomerwiseentryPage", icon: "ios-basket",sublist:"N",menuclose:"menuClose" },
    //  { title: 'Create Staff', component: "StaffPage", icon: "logo-buffer",sublist:"N",menuclose:"menuClose" },
      { title: 'Lists', component: "Lists", icon: "md-list",sublist:"L",menuclose:"" },
     
      { title: 'Daily Stock', component: "DailystockPage", icon: "ios-basket",sublist:"N",menuclose:"menuClose" },
      { title: 'Payments', component: "GoogelmapPage", icon: "card",sublist:"N",menuclose:"menuClose" },
    
      { title: 'Reports', component: "Reports", icon: "ios-albums",sublist:"R",menuclose:"" },
      { title: 'DayEnd Sales', component: "ServiceContactPage", icon: "card",sublist:"N",menuclose:"menuClose" },
      { title: 'Printer Setting', component: "PrinterSettingsPage", icon: "settings",sublist:"N",menuclose:"menuClose" },
      { title: 'Logout', component: "LoginPage", icon: "md-log-out",sublist:"N",menuclose:"menuClose" },
    ];
    this.rsublist=[
      { title: 'Sales Reports', component: "ScheduleJobPage", icon: "ios-albums",sublist:"R",menuclose:"menuClose" },
      { title: 'Item by Sales Reports', component: "SalesreportbycatPage", icon: "ios-albums",sublist:"R",menuclose:"menuClose" },
      { title: 'Payment Type Reports', component: "CredcustomerpaymentreportPage", icon: "ios-albums",sublist:"R",menuclose:"menuClose" },
      { title: 'Credit Customer Reports', component: "CredcustomerreportPage", icon: "ios-albums",sublist:"R",menuclose:"menuClose" },
      { title: 'Purchase Reports', component: "PurchasereportPage", icon: "ios-albums",sublist:"R",menuclose:"menuClose" },]
  
  this.lsublist=[
    { title: 'Credit Customer List', component: "CreditcustomerlistPage", icon: "md-list",sublist:"L",menuclose:"menuClose" },
    { title: 'Items List', component: "ReviewsPage", icon: "md-list",sublist:"L",menuclose:"menuClose" },
    { title: 'Catagory List', component: "FaqPage", icon: "md-list",sublist:"L",menuclose:"menuClose" },
  ]
}
    // if(localStorage.getItem("UserType")=="S"){
  
  // }else{
  //   this.pages = [
  //     { title: 'Book Order', component: "BookServicePage", icon: "ios-basket" },
  //     { title: 'My Orders', component: "ServiceJobHistoryPage", icon: "ios-basket" },
  //     { title: 'Logout', component: "LoginPage", icon: "md-log-out" },
  //   ];
  // }

  }
  rmenuItemHandler(): void {
    this.rshowSubmenu = !this.rshowSubmenu;
  }
  lmenuItemHandler(): void {
    this.lshowSubmenu = !this.lshowSubmenu;
  }
  
    /**
*  initializing app
*  setting platform ready
*  checking network connection
*  checking for firbase notifications
*/
  initializeApp() {
    this.platform.ready().then(() => {
      this.networkService.networkCheck();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
      if (this.platform.is('android')) {
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#b8860b');
      } else if (this.platform.is('ios')) {
        this.statusBar.styleDefault();
      }
      this.splashScreen.hide();

    });
    this.platform.registerBackButtonAction(() => {
      this.usertype=localStorage.getItem("UserType");
      let nav = this.app.getActiveNav();
      let view = this.nav.getActive();
      let page = view ? this.nav.getActive().instance : null;
      let ready = true;
      //let prevPage;
      let activePortal = this.ionicApp._loadingPortal.getActive() || this.ionicApp._toastPortal.getActive() || this.ionicApp._overlayPortal.getActive() || this.ionicApp._modalPortal.getActive();
      if (activePortal) {
        ready = false;
        activePortal.dismiss();
        activePortal.onDidDismiss(() => { ready = true; });
        return;
     }
    if (page && page.isRootPage) {
        this.myHandlerFunction();
      }
      else if (view && view.isOverlay) {
          this.nav.pop();

      }
      if (nav.canGoBack()) { //Can we go back?
        if(nav.getActive().name=='BookServicePage' || nav.getActive().name=='CustomerorderPage'){
          this.myHandlerFunction();
        }

        else{

          this.nav.pop();
          this.utils.delallcart();
        }
        }
         else {
          if(nav.getActive().name !='BookServicePage' && nav.getActive().name!=='CustomerorderPage')
          {
          if(nav.getActive().name =='BilldetailsPage' || nav.getActive().name =='NotificationsPage'){
            if(this.usertype==="C"){
              this.nav.setRoot("CustomerorderPage");
            }
            else{
              this.nav.setRoot("BookServicePage", this.cart);

            }
            
          }
          else if(nav.getActive().name =='NewmybookingsPage'){
            this.nav.setRoot("LoginPage");
          }
          else if(nav.getActive().name =='LoginPage'){
            this.platform.exitApp();
          }
          else if(nav.getActive().name =='IntroductionSliderPage'){
            this.platform.exitApp();
          }
          else{
            console.log( this.nav.last());
            this.nav.pop();

          }
          }
          else
            this.myHandlerFunction() //Exit from app
        }
      }, 1);


  }
  myHandlerFunction() {
    let alert = this.alertCtrl.create({
      title: 'Exit',
      mode: 'ios',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Exit',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    alert.present();
  }

    /**
*  opening perticular page on selecting
*/

onMenuOpen(){
  console.log("onMenu");
}
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component=='LoginPage')
    {
      localStorage.removeItem("user_id")
      localStorage.removeItem("user_name")
      localStorage.removeItem("user_phone")
      localStorage.removeItem("user_email")
      localStorage.removeItem("UserType")
     localStorage.clear();
     this.menuCtrl.close();
     this.nav.setRoot(page.component);

    }
    else if(page.component=="Reports"){
      this.rmenuItemHandler();
      this.menuCtrl.open();
      
    }
    else if(page.component=="Lists"){
      this.lmenuItemHandler();
      this.menuCtrl.open();
      
    }
    else{
      this.menuCtrl.close();

    this.nav.setRoot(page.component);
    }
    
  }

  OpenProfilePage(){
    this.nav.setRoot("ProfilePage");
    this.menuCtrl.close();


  }
}
