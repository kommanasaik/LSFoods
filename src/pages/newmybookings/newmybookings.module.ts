import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewmybookingsPage } from './newmybookings';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    NewmybookingsPage,
  ],
  imports: [
    IonicPageModule.forChild(NewmybookingsPage),
    ComponentsModule

  ],
})
export class NewmybookingsPageModule {}
