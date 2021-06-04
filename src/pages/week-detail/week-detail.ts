import { PhotoPage } from './../photo/photo';
import { AddPhotoPage } from './../add-photo/add-photo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@IonicPage()
@Component({
  selector: 'page-week-detail',
  templateUrl: 'week-detail.html',
})
export class WeekDetailPage {

  data: any = [];
  ders = {
    id: 0,
    name: '',
  };
  hafta = {
    id: 0,
    name: '',
  }
  photo = {
    id: 0,
    name: '',
    path: ''
  }
  public base64Image: string;
  public filterText: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    public camera: Camera,
    public platform: Platform,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    this.ders.id = navParams.get('lid');
    this.ders.name = navParams.get('lname');
    this.hafta.id = navParams.get('wid');
    this.hafta.name = navParams.get('wname');
    this.photo.id = navParams.get('id');
    this.photo.name = navParams.get('name');
    this.photo.path = navParams.get('path');
  }
  ionViewDidLoad() {
    this.getData();
  }
  tapEvent(id, name, path) {
    this.navCtrl.push(PhotoPage, {
      id: id,
      name: name,
      path: path
    });
  }
  successAlert() {
    let alert = this.alertCtrl.create({
      title: 'Başarılı',
      subTitle: 'Fotoğrafınız silindi.',
      buttons: ['Tamam']
    });
    alert.present();
  }
  refresh() {
    this.getData();
  }
  takePhoto(id, name, wid, wname) {
    this.navCtrl.push(AddPhotoPage, {
      id: this.ders.id,
      name: this.ders.name,
      wid: this.hafta.id,
      wname: this.hafta.name
    });
  }
  getData(filterText?) {
    let hid = this.hafta.id;
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS photos(id INTEGER PRIMARY KEY,name TEXT,path TEXT,lid INTEGER,wid INTEGER)', {})
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
        var val = this.filterText;
        if (val && val.trim() != '') {
          db.executeSql('SELECT *FROM photos WHERE wid=?', [hid]).then(res => {
            if (val) {
              db.executeSql('SELECT *FROM photos WHERE name LIKE ?', [val]).then(res => {
                this.data = [];
                for (var index = 0; index < res.rows.length; index++) {
                  this.data.push({
                    id: res.rows.item(index).id,
                    name: res.rows.item(index).name,
                    path: res.rows.item(index).path,
                    lid: res.rows.item(index).lid,
                    wid: res.rows.item(index).wid,
                  })
                }
              }).catch(e => console.log(e));
            }
            this.data = [];
            for (var index = 0; index < res.rows.length; index++) {
              this.data.push({
                id: res.rows.item(index).id,
                name: res.rows.item(index).name,
                path: res.rows.item(index).path,
                lid: res.rows.item(index).lid,
                wid: res.rows.item(index).wid,
              })
            }
          }).catch(e => console.log(e));
        } else {
          db.executeSql('SELECT *FROM photos WHERE wid=?', [hid]).then(res => {
            console.log('Executed SQL select done');
            this.data = [];
            for (var index = 0; index < res.rows.length; index++) {
              this.data.push({
                id: res.rows.item(index).id,
                name: res.rows.item(index).name,
                path: res.rows.item(index).path,
                lid: res.rows.item(index).lid,
                wid: res.rows.item(index).wid,
              })
            }
          }).catch(e => console.log(e));
        }

      })
      .catch(e => console.log(e));
  }
  deleteLesson(id) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM photos WHERE id=?', [id])
          .then(() => {
            this.getData();
            this.successAlert();
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));

  }
}