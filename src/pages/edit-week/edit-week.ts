import { SQLite,SQLiteObject } from '@ionic-native/sqlite';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the EditWeekPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-week',
  templateUrl: 'edit-week.html',
})
export class EditWeekPage {
  data = {
    id: 0,
    name: '',
    lid:0,
    date:''
  }
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlite:SQLite,
    public alertCtrl:AlertController
  ) 
  {
    this.data.id = navParams.get('id');
    this.data.name = navParams.get('name');
    this.data.lid=navParams.get('lid');
    this.data.date=navParams.get('date');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditWeekPage');
  }
  successAlert() {
    let alert = this.alertCtrl.create({
      title: 'Başarılı',
      subTitle: 'Hafta düzeltildi.',
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
  updateWeek(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('UPDATE weeks set name=?,lid=?,date=? WHERE id=?',[
          this.data.name,
          this.data.lid,
          this.data.date,          
          this.data.id
        ])
        .then(() => {
          this.navCtrl.pop();
          this.successAlert();
        })
          .catch(e => {
            this.failAlert();
            console.log(e)});
      })
      .catch(e => console.log(e));
  }

}
