import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the PrinterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PrinterProvider {

  constructor(
    public serial: BluetoothSerial,
    private alertCtrl: AlertController,
  ) { }

  searchPrinter() {
  
    return this.serial.list();
  }

  connect(address: any) {
    return this.serial.connect(address);
  }

  disconnect() {
    return this.serial.disconnect();
  }

  messageTo(address: any, printData: string) {
    this.connect(address).subscribe((data: any) => {
      this.serial.write(printData).then((w: any) => {
        this.serial.disconnect();
      },
        (error: any) => {
          let mno = this.alertCtrl.create({
            title: "ERROR " + error,
            buttons: ['Dismiss']
          });
          mno.present();
        })
    }, (error: any) => {
      let mno = this.alertCtrl.create({
        title: "ERROR " + error,
        buttons: ['Dismiss']
      });
      mno.present();
    })
  }
}
