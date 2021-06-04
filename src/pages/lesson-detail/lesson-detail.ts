import { WeekDetailPage } from './../week-detail/week-detail';
import { EditWeekPage } from './../edit-week/edit-week';
import { AddWeekPage } from './../add-week/add-week';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@IonicPage()
@Component({
  selector: 'page-lesson-detail',
  templateUrl: 'lesson-detail.html',
})
export class LessonDetailPage {

  ders={
    id:0,
    name:'',
  };
  data:any=[];
  
  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     private sqlite: SQLite,
    private alertCtrl:AlertController) 
    {
    this.ders.id = navParams.get('id');
    this.ders.name = navParams.get('name');
  }
  ionViewDidLoad() {
    this.getData();
  }
  itemTapped(id,name) {
    this.navCtrl.push(WeekDetailPage,{
      wid:id,
      wname:name,
    });
  }
  successAlert() {
    let alert = this.alertCtrl.create({
      title: 'Başarılı',
      subTitle: 'Hafta silindi.',
      buttons: ['Tamam']
    });
    alert.present();
  }
  refresh(){
    this.getData();
  }
  getData() {
    let did=this.ders.id;
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS weeks(id INTEGER PRIMARY KEY,name TEXT,lid INTEGER,date TEXT)', {})
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
          db.executeSql('SELECT *FROM weeks WHERE lid=?',[did]).then(res=>{
            console.log('Executed SQL select done');
            this.data=[];
            for (var index = 0; index < res.rows.length; index++) {
             this.data.push({
               id:res.rows.item(index).id,
               name:res.rows.item(index).name,
               lid:res.rows.item(index).lid,
               date:res.rows.item(index).date,                             
             })
            }
          }).catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }
  addWeek(lid){
    this.navCtrl.push(AddWeekPage,{
      lid:this.ders.id,
    });
  }
  editWeek(id,name,lid,date,){
    this.navCtrl.push(EditWeekPage,{
      id:id,
      name:name,
      lid:this.ders.id,
      date:date,
    });
  }
  deleteWeek(id){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM weeks WHERE id=?',[id])
          .then(() => {
            this.getData();
            this.successAlert();

          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
      
    }
  
  }