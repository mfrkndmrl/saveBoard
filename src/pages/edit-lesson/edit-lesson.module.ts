import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditLessonPage } from './edit-lesson';

@NgModule({
  declarations: [
    EditLessonPage,
  ],
  imports: [
    IonicPageModule.forChild(EditLessonPage),
  ],
})
export class EditLessonPageModule {}
