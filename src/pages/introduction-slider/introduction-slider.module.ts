import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntroductionSliderPage } from './introduction-slider';

@NgModule({
  declarations: [
    IntroductionSliderPage,
  ],
  imports: [
    IonicPageModule.forChild(IntroductionSliderPage),
  ],
})
export class IntroductionSliderPageModule {}
