import { LessonsPage } from './../lessons/lessons';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-edit-lesson',
  templateUrl: 'edit-lesson.html',
})
export class EditLessonPage {

  data = {
    id: 0,
    name: '',
  }
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private sqlite: SQLite
  ) 
  {
    this.data.id = navParams.get('id');
    this.data.name = navParams.get('name');
  }
  successAlert() {
    let alert = this.alertCtrl.create({
      title: 'Başarılı',
      subTitle: 'Dersiniz düzeltildi.',
      buttons: ['Tamam']
    });
    
    alert.present();
  }
  failAlert() {
    let alert = this.alertCtrl.create({
      title: 'Başarısız',
      buttons: ['Tamam']
    });
    alert.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditLessonPage');
  }
  
  updateLesson(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('UPDATE lessons set name=? WHERE id=?',[
          this.data.name,
          this.data.id
        ])
        .then(() => {
          this.navCtrl.push(LessonsPage);
          this.successAlert();
        })
          .catch(e => {
            this.failAlert();
            console.log(e)});
      })
      .catch(e => console.log(e));
  }
  }


