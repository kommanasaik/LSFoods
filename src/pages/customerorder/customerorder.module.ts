import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerorderPage } from './customerorder';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CustomerorderPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(CustomerorderPage),
  ],
})
export class CustomerorderPageModule {}
