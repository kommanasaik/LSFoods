import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationsPage } from './notifications';
import { ComponentsModule } from '../../components/components.module';
import { DatePipe } from '@angular/common';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { PrinterProvider } from '../../providers/printer/printer';
import {BillweightPipe} from '../../pipes/billweight/billweight';

@NgModule({
  declarations: [
    NotificationsPage,BillweightPipe
  ],
  imports: [
    IonicPageModule.forChild(NotificationsPage),
    ComponentsModule
  ],
  providers:[
    DatePipe,
    BluetoothSerial,
    PrinterProvider
  ]
})
export class NotificationsPageModule {}
