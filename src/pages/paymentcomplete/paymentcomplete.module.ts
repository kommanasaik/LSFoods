import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentcompletePage } from './paymentcomplete';

@NgModule({
  declarations: [
    PaymentcompletePage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentcompletePage),
  ],
})
export class PaymentcompletePageModule {}
