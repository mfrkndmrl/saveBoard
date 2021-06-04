import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonDetailPage } from './lesson-detail';

@NgModule({
  declarations: [
    LessonDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(LessonDetailPage),
  ],
})
export class LessonDetailPageModule {}
