import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header';
import { IonicModule } from 'ionic-angular';
import { FooterComponent } from './footer/footer';
import { MediacomponentComponent } from './mediacomponent/mediacomponent';
import { ReviewsListComponent } from './reviews-list/reviews-list';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
    MediacomponentComponent,
    ReviewsListComponent,
	
	],
	imports: [
		IonicModule,
		StarRatingModule
	],
	exports: [
		HeaderComponent,
		FooterComponent,
    MediacomponentComponent,
    ReviewsListComponent,
	
	]
})
export class ComponentsModule { }
