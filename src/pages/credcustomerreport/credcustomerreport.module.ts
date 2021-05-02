import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CredcustomerreportPage } from './credcustomerreport';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CredcustomerreportPage,
  ],
  imports: [
    IonicPageModule.forChild(CredcustomerreportPage),ComponentsModule
  ],
})
export class CredcustomerreportPageModule {}
