import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BilldetailsPage } from './billdetails';
import {WeightapdPipe} from '../../pipes/weight/weight';
@NgModule({
  declarations: [
    BilldetailsPage,WeightapdPipe
  ],
  imports: [
    IonicPageModule.forChild(BilldetailsPage),
  ],
})
export class BilldetailsPageModule {}
