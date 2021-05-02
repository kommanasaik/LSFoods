import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreditcustomerlistPage } from './creditcustomerlist';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CreditcustomerlistPage,
  ],
  imports: [
    IonicPageModule.forChild(CreditcustomerlistPage),ComponentsModule
  ],
})
export class CreditcustomerlistPageModule {}
