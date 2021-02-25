import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllsubservicesPage } from './allsubservices';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AllsubservicesPage,
  ],
  imports: [ComponentsModule,
    IonicPageModule.forChild(AllsubservicesPage),
  ],
})
export class AllsubservicesPageModule {}
