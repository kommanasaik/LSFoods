import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerwiseentryPage } from './customerwiseentry';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CustomerwiseentryPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerwiseentryPage),ComponentsModule
  ],
})
export class CustomerwiseentryPageModule {}
