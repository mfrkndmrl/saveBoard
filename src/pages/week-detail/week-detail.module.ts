import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WeekDetailPage } from './week-detail';

@NgModule({
  declarations: [
    WeekDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WeekDetailPage),
  ],
})
export class WeekDetailPageModule {}
