import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceContactPage } from './service-contact';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ServiceContactPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceContactPage),
    ComponentsModule

  ],
})
export class ServiceContactPageModule {}
