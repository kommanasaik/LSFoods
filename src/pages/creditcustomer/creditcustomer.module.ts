import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreditcustomerPage } from './creditcustomer';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CreditcustomerPage,
  ],
  imports: [ComponentsModule,
    IonicPageModule.forChild(CreditcustomerPage),
  ],
})
export class CreditcustomerPageModule {}
