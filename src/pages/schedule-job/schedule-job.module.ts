import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduleJobPage } from './schedule-job';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    ScheduleJobPage,
  ],
  imports: [
    IonicPageModule.forChild(ScheduleJobPage),
    ComponentsModule
  ],
})
export class ScheduleJobPageModule {}
