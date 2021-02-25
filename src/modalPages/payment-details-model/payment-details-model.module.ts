import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentDetailsModelPage } from './payment-details-model';

@NgModule({
  declarations: [
    PaymentDetailsModelPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentDetailsModelPage),
  ],
})
export class PaymentDetailsModelPageModule {}
