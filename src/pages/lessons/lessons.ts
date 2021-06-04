import { AddLessonPage } from './../add-lesson/add-lesson';
import { EditLessonPage } from './../edit-lesson/edit-lesson';
import { LessonDetailPage } from './../lesson-detail/lesson-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@IonicPage()
@Component({
  selector: 'page-lessons',
  templateUrl: 'lessons.html',
})
export class LessonsPage {

  data:any=[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private sqlite: SQLite
  )
   { 
    this.data.id = navParams.get('id');
    this.data.name = navParams.get('name');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonsPage');
    this.getData();
    
  }
  refresh(){
    this.getData()
  }
  itemTapped(id,name) {
    this.navCtrl.push(LessonDetailPage,{
      id:id,
      name:name,
    });
  }
  successAlert() {
    let alert = this.alertCtrl.create({
      title: 'Başarılı',
      subTitle: 'Dersiniz silindi.',
      buttons: ['Tamam']
    });
    alert.present();
  }
     
    getData() {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql('CREATE TABLE IF NOT EXISTS lessons(id INTEGER PRIMARY KEY,name TEXT)', {})
            .then(() => console.log('Executed SQL'))
            .catch(e => console.log(e));
  
            db.executeSql('SELECT *FROM lessons ORDER BY id ASC',{}).then(res=>{
              console.log('Executed SQL select done');
              this.data=[];
              for (var index = 0; index < res.rows.length; index++) {
               this.data.push({
                 id:res.rows.item(index).id,
                 name:res.rows.item(index).name,              
               })
              }
            }).catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    }
    addLesson(){
      this.navCtrl.push(AddLessonPage);
    }
    editLesson(id,name){
      this.navCtrl.push(EditLessonPage,{
        id:id,
        name:name,
      });
    }
    deleteLesson(id){
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
  
  
          db.executeSql('DELETE FROM lessons WHERE id=?',[id])
            .then(() => {
              this.getData();
              this.successAlert();

            })
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
        
      }
  }
  

