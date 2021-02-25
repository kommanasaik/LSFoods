import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookServicePage } from './book-service';
import { ComponentsModule } from '../../components/components.module';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    BookServicePage,
  ],
  imports: [
    StarRatingModule,
    IonicPageModule.forChild(BookServicePage),
    ComponentsModule,
    
  ],
})
export class BookServicePageModule {}
