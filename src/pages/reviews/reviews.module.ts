import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewsPage } from './reviews';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ReviewsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewsPage),
    ComponentsModule
  ],
})
export class ReviewsPageModule {}
