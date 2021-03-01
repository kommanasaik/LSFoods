import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesreportbycatPage } from './salesreportbycat';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SalesreportbycatPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesreportbycatPage),
    ComponentsModule

  ],
})
export class SalesreportbycatPageModule {}
