import { Component } from '@angular/core';
import {  IonicPage, NavController, NavParams } from 'ionic-angular';
import { PrinterProvider } from '../../providers/printer/printer';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PrinterSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-printer-settings',
  templateUrl: 'printer-settings.html',
})
export class PrinterSettingsPage {

  btList: any = [];
  headerTitle: string = "SET DEFAULT PRINTER"
  isChange: boolean = false;
  selected: any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private btPrint: PrinterProvider,
    private storage: Storage
  ) {
  }

  ionViewDidLoad() {
    this.btPrint.searchPrinter().then((list: any) => {
      if (list.length != 0) {
        this.btList = list;
        this.storage.get('default_print').then((val) => {
          this.selected = val;
        });
      }
    })

    // this.storage.get('default_print').then((val) => {
    //   this.selected = val;
    // });
  }

  setDefault() {
    this.isChange = false;
    this.storage.set('default_print', this.selected);

  }

  change() {
    this.isChange = true;
  }

}
