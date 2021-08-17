import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StafflistPage } from './stafflist';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    StafflistPage,
  ],
  imports: [
    IonicPageModule.forChild(StafflistPage),ComponentsModule
  ],
})
export class StafflistPageModule {}
