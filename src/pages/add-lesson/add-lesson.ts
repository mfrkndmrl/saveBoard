import { LessonsPage } from './../lessons/lessons';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-lesson',
  templateUrl: 'add-lesson.html',
})
export class AddLessonPage {

  data = {
    name: '',
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private sqlite: SQLite

  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddLessonPage');
  }
  successAlert() {
    let alert = this.alertCtrl.create({
      title: 'Başarılı',
      subTitle: 'Dersiniz eklendi.',
      buttons: ['Tamam']
    });
    alert.present();
  }
  saveData() {

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO lessons VALUES(NULL,?)', [
          this.data.name
        ])
          .then(() => {
            this.successAlert();
            this.navCtrl.push(LessonsPage);

          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }
}


