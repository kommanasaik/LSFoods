import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CredcustomerpaymentreportPage } from './credcustomerpaymentreport';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CredcustomerpaymentreportPage,
  ],
  imports: [
    IonicPageModule.forChild(CredcustomerpaymentreportPage),
    ComponentsModule
  ],
})
export class CredcustomerpaymentreportPageModule {}
