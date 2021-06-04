import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditWeekPage } from './edit-week';

@NgModule({
  declarations: [
    EditWeekPage,
  ],
  imports: [
    IonicPageModule.forChild(EditWeekPage),
  ],
})
export class EditWeekPageModule {}
