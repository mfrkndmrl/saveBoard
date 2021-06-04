import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, normalizeURL } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-photo',
  templateUrl: 'add-photo.html',
})
export class AddPhotoPage {
  public base64Image: string;
  public hid: number;
  public wid: number;

  datap = {
    name: '',
    path:'',
    plid:0,
    pwid:0,
  }
  ders = {
    lid: 0,
    lname: '',
  };
  hafta = {
    wid: 0,
    wname: '',
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private sqlite: SQLite,
    private alertCtrl: AlertController,
    public camera: Camera, ) {
    this.ders.lid = navParams.get('id');
    this.ders.lname = navParams.get('name');
    this.hafta.wid = navParams.get('wid');
    this.hafta.wname = navParams.get('wname');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPhotoPage');
  }
  successAlert() {
    let alert = this.alertCtrl.create({
      title: 'Başarılı',
      subTitle: 'Fotoğrafınız eklendi.',
      buttons: ['Tamam']
    });
    alert.present();
  }
  takePhoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.platform.is('ios') ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
      allowEdit: true,
      sourceType: 1
    }
    this.camera.getPicture(options).then((imageData) => {
      //get photo from the camera based on platform type
      if (this.platform.is('ios')) {
        this.base64Image = normalizeURL(imageData);
      }
      else {
        this.base64Image = "data:image/jpeg;base64," + imageData;
      }
      // //add photo to the array of photos
      // this.addPhoto(base64Image);
    }, (error) => {
      alert("Fotoğraf çekme işlemi başarısız oldu!");
      console.debug("Fotoğraf kullanılamıyor: " + error, "app");
      console.log(error);
    });
  }
  choosePhoto() {
    const optionsC = {
      quality: 100,
      destinationType: this.platform.is('ios') ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      allowEdit: true,
      sourceType: 0,
      maximumImagesCount: 10,
    }
    this.camera.getPicture(optionsC).then((imageData) => {
      //get photo from the camera based on platform type
      if (this.platform.is('ios')) {
        this.base64Image = normalizeURL(imageData);
      }
      else {
        this.base64Image = "data:image/jpeg;base64," + imageData;
      }
      // //add photo to the array of photos
      // this.addPhoto(base64Image);
    }, (error) => {
      alert("Fotoğraf seçme işlemi başarısız oldu!");
      console.debug("Fotoğraf kullanılamıyor: " + error, "app");
      console.log(error);
    });
  }
  savePhoto() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO photos VALUES(NULL,?,?,?,?)', [
          this.datap.name,
          this.base64Image,
          this.ders.lid,
          this.hafta.wid,
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

