import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrinterSettingsPage } from './printer-settings';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { ComponentsModule } from '../../components/components.module';
import { PrinterProvider } from '../../providers/printer/printer';


@NgModule({
  declarations: [
    PrinterSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(PrinterSettingsPage),
    ComponentsModule,

  ],
  providers:[
    BluetoothSerial,
    PrinterProvider,    
    
  ]
})
export class PrinterSettingsPageModule {}
