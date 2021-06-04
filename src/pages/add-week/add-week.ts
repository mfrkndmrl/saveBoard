import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@IonicPage()
@Component({
  selector: 'page-add-week',
  templateUrl: 'add-week.html',
})
export class AddWeekPage {

  week = {
    name: '',
    lid:0,
    date:'',
  }
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlite:SQLite,
    public alertCtrl:AlertController
  ) 
    {
    this.week.lid= navParams.get('lid');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddWeekPage');
  }
  successAlert() {
    let alert = this.alertCtrl.create({
      title: 'Başarılı',
      subTitle: 'Hafta eklendi.',
      buttons: ['Tamam']
    });
    alert.present();
  }
  saveWeek(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO weeks VALUES(NULL,?,?,?)', [
          this.week.name,
          this.week.lid,
          this.week.date,
          
        ])
          .then(() => {
            this.successAlert();
            this.navCtrl.pop();

          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }


}
