import { SQLite,SQLiteObject } from '@ionic-native/sqlite';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
})
export class PhotoPage {
  data:any=[];
  photo={
    id:0,
    name:'',
    path:''
  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private sqlite: SQLite,
    private alertCtrl: AlertController,
    private socialSharing: SocialSharing) {
    this.photo.id = navParams.get('id');
    this.photo.name = navParams.get('name');
    this.photo.path = navParams.get('path');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoPage');
  }
  successAlert() {
    let alert = this.alertCtrl.create({
      title: 'Başarılı',
      subTitle: 'Fotoğrafınız silindi.',
      buttons: ['Tamam']
    });
    alert.present();
  }
  deletePhoto(id) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM photos WHERE id=?', [id])
          .then(() => {
            this.successAlert();
            this.navCtrl.pop();
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));

  }
  // share(path){
  //   var message;
  //   var image=path;
  //   this.socialSharing.shareViaWhatsApp("SaveBoad uygulamasından gönderildi.", "image","link")
  //     .then(()=>{
  //       console.log("WhatsApp share successful");
  //     }).catch((err)=> {
  //     console.log("An error occurred ", err);
  //   }); 
  // }
  shareWhatsApp(path){
    //shareViaWhatsApp(message, image, url)
      this.socialSharing.shareViaWhatsApp(null, path, null); 
    }

}
