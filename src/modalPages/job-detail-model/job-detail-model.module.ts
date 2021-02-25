import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobDetailModelPage } from './job-detail-model';

@NgModule({
  declarations: [
    JobDetailModelPage,
  ],
  imports: [
    IonicPageModule.forChild(JobDetailModelPage),
  ],
})
export class JobDetailModelPageModule {}
