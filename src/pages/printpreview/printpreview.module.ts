import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrintpreviewPage } from './printpreview';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PrintpreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(PrintpreviewPage),ComponentsModule
  ],
})
export class PrintpreviewPageModule {}
