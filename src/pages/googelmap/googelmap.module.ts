import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoogelmapPage } from './googelmap';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    GoogelmapPage,
  ],
  imports: [
    IonicPageModule.forChild(GoogelmapPage),
    ComponentsModule

  ],
})
export class GoogelmapPageModule {}
