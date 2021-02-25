import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BilldetailsPage } from './billdetails';

@NgModule({
  declarations: [
    BilldetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BilldetailsPage),
  ],
})
export class BilldetailsPageModule {}
