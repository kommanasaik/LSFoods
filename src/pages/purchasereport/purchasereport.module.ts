import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchasereportPage } from './purchasereport';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PurchasereportPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchasereportPage),ComponentsModule
  ],
})
export class PurchasereportPageModule {}
