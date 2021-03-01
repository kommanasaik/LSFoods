import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleentryitemPage } from './singleentryitem';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SingleentryitemPage,
  ],
  imports: [
    IonicPageModule.forChild(SingleentryitemPage),
    ComponentsModule
  ],
})
export class SingleentryitemPageModule {}
