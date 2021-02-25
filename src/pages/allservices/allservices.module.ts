import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllservicesPage } from './allservices';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    AllservicesPage,
  ],
  imports: [
    IonicPageModule.forChild(AllservicesPage),
    ComponentsModule
  ],
  
})
export class AllservicesPageModule {}
