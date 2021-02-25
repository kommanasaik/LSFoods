import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceJobHistoryPage } from './service-job-history';
import { ComponentsModule } from '../../components/components.module';
import { StarRatingModule } from 'ionic3-star-rating';


@NgModule({
  declarations: [
    ServiceJobHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceJobHistoryPage),
    ComponentsModule,
    StarRatingModule,
  ],
})
export class ServiceJobHistoryPageModule {}
