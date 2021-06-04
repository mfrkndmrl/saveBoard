import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddWeekPage } from './add-week';

@NgModule({
  declarations: [
    AddWeekPage,
  ],
  imports: [
    IonicPageModule.forChild(AddWeekPage),
  ],
})
export class AddWeekPageModule {}
