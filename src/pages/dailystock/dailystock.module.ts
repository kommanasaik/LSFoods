import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailystockPage } from './dailystock';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DailystockPage,
  ],
  imports: [
    IonicPageModule.forChild(DailystockPage),ComponentsModule
  ],
})
export class DailystockPageModule {}
