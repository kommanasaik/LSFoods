import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,App,IonicApp,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm';
import { NetworkServiceProvider } from '../providers/network-service/network-service';
import { UtilsServiceProvider } from '../providers/utils-service/utils-service';

@Component({
  templateUrl: 'app.html'
})

/**
 * Manages all methods 
 */
export class MyApp {

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
  pages: Array<{ title: string, component: any, icon: any }>;

  /**
* Value of the AppLogo
*/
  AppLogo = 'assets/images/sidemenu-logo.png';

  /**
*  loads first when entering to the page 
*  getting stored values in the app
*  navigating to perticular page conditionally
*/
  constructor(
    public app: App,

    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: Storage,
    public fcm: FCM,
    public networkService: NetworkServiceProvider,
    public utils: UtilsServiceProvider
    ,public ionicApp: IonicApp,
    public alertCtrl: AlertController


  ) {
    this.initializeApp();

      if(localStorage.getItem("user_id")!="" && localStorage.getItem("user_id")!=null){
        this.rootPage = "BookServicePage"
      }
      else{
        this.rootPage = "IntroductionSliderPage" 
      }

    // this.storage.get('auth').then((auth) => {

    //   if (auth) {



    //     this.storage.get('user_id').then((id) => {
    //       this.storage.get('user_name').then((name) => {
    //         this.storage.get('user_phone').then((phone) => {
    //           this.storage.get('user_address').then((address) => {
    //             if (name && phone && address) {
    //               this.rootPage = "BookServicePage"
    //             } else {
    //               localStorage.setItem("new_user", "success");
    //               this.rootPage = "ProfilePage"
    //             }
    //           })
    //         })
    //       })
    //     })
    //   } else {
    //   //  this.rootPage = "IntroductionSliderPage"
    //    // this.rootPage = "BookServicePage"
    // this.rootPage = "LoginPage"
    //   }

    // })
    // used for an example of ngFor and navigation
    if(localStorage.getItem("UserType")!=="S"){
    this.pages = [
      { title: 'Book Order', component: "BookServicePage", icon: "ios-basket" },
      { title: 'Single Item Entry', component: "SingleentryitemPage", icon: "ios-basket" },
      { title: 'My Orders', component: "ServiceJobHistoryPage", icon: "ios-basket" },
      { title: 'Add Catagory', component: "AllsubservicesPage", icon: "logo-buffer" },
      { title: 'Catagory List', component: "FaqPage", icon: "logo-buffer" },
      { title: 'Add Items', component: "AllservicesPage", icon: "ios-color-filter" },
      { title: 'Items List', component: "ReviewsPage", icon: "ios-color-filter" },
      { title: 'Payments', component: "GoogelmapPage", icon: "card" },
      { title: 'Sales Reports', component: "ScheduleJobPage", icon: "card" },
      { title: 'Item by Sales Reports', component: "SalesreportbycatPage", icon: "card" },
      { title: 'DayEnd Sales', component: "ServiceContactPage", icon: "card" },
      { title: 'Logout', component: "LoginPage", icon: "md-log-out" },
    ];
  }else{
    this.pages = [
      { title: 'Book Order', component: "BookServicePage", icon: "ios-basket" },
      { title: 'My Orders', component: "ServiceJobHistoryPage", icon: "ios-basket" },
      { title: 'Logout', component: "LoginPage", icon: "md-log-out" },
    ];
  }

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
      // this.fcm.onNotification().subscribe(data => {
      //   // console.log("notification called..",data);
      //   if (data.wasTapped) {
      //     this.rootPage = data.navigation
      //   } else {
      //     // console.log(data.apps)
      //     // this.utils.presentAlert("Notification","Notification Received.")
      //   }

      // });
    });
    this.platform.registerBackButtonAction(() => {
      let nav = this.app.getActiveNav();
      let view = this.nav.getActive();
      let page = view ? this.nav.getActive().instance : null;
      let ready = true;
      let prevPage;
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
        if(nav.getActive().name=='BookServicePage'){
          this.myHandlerFunction();
        }
       
        else{
       
          this.nav.pop();
      
        }
        }
         else {
          if(nav.getActive().name !='BookServicePage')
          {
            console.log( this.nav.last());
            this.nav.pop();

         
          }  
          else
            this.myHandlerFunction() //Exit from app
        }
      }, 1);

     
  }
  myHandlerFunction() {
    let alert = this.alertCtrl.create({
      title: 'Exit?',
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
     this.nav.setRoot(page.component);

    }  
    else{
    this.nav.setRoot(page.component);
    }
  }
}
