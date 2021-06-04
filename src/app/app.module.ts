import { PhotoPage } from './../pages/photo/photo';
import { AddPhotoPage } from './../pages/add-photo/add-photo';
import { WeekDetailPage } from './../pages/week-detail/week-detail';
import { EditWeekPage } from './../pages/edit-week/edit-week';
import { AddWeekPage } from './../pages/add-week/add-week';
import { EditLessonPage } from './../pages/edit-lesson/edit-lesson';
import { AddLessonPage } from './../pages/add-lesson/add-lesson';
import { ImagePicker } from '@ionic-native/image-picker';
import { GalleryPage } from './../pages/gallery/gallery';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LessonsPage } from './../pages/lessons/lessons';
import { LessonDetailPage } from './../pages/lesson-detail/lesson-detail';

import { StatusBar } from '@ionic-native/status-bar';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LessonsPage,
    LessonDetailPage,
    GalleryPage,
    AddLessonPage,
    EditLessonPage,
    AddWeekPage,
    EditWeekPage,
    WeekDetailPage,
    AddPhotoPage,
    PhotoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LessonsPage,
    LessonDetailPage,
    GalleryPage,
    AddLessonPage,
    EditLessonPage,
    AddWeekPage,
    EditWeekPage,
    WeekDetailPage,
    AddPhotoPage,
    PhotoPage
  ],
  providers: [
    StatusBar,
    Camera,
    ImagePicker,
    SQLite,
    SocialSharing,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
