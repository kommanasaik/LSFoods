import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicecallsProvider } from '../../providers/servicecalls/servicecalls';


@IonicPage()
@Component({
  selector: 'page-introduction-slider',
  templateUrl: 'introduction-slider.html',
})
export class IntroductionSliderPage {

   /**
*  loads first when entering to the page 
*/
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ss:ServicecallsProvider) {
  }

    /**
*  Fired after loading constructor
*/
  ionViewDidLoad() {
  }

    /**
*  To go to login page
*/
  login(){
    let UserLoginData={
      username: "admin",
      password: "pass@121"
    }
  //  this.ss.checkNumber(UserLoginData).subscribe((result) => {
    this.navCtrl.push("LoginPage");
    //});
  }

}
