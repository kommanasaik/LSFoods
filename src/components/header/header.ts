import { Component, Input } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})

/**
 * Manages all methods 
 */
export class HeaderComponent {

  /**
*  To initiate this component whereever we used in a template.
*  @param title bounded variable in that template
*/
  @Input() title: any;

  /**
* declaring hideicons
*/
  hideicons: boolean;

    /**
*  loads first when entering to the page 
*  enabling menu conditionally
*  getting stored values in app
*/
  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public menuCtrl: MenuController
  ) {
    this.menuCtrl.swipeEnable(false);
         
  }

  /**
*  logging out the app
*  removing stored values in app
*/
  logout() {
    this.navCtrl.setRoot('LoginPage');
    this.storage.remove('user_id');
    this.storage.remove('user_name');
    this.storage.remove('user_phone');
    this.storage.remove('user_email');
    this.storage.remove('auth');
  }

}
