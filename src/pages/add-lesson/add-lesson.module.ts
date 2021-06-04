import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddLessonPage } from './add-lesson';

@NgModule({
  declarations: [
    AddLessonPage,
  ],
  imports: [
    IonicPageModule.forChild(AddLessonPage),
  ],
})
export class AddLessonPageModule {}
