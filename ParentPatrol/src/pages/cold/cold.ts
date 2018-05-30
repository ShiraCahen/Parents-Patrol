import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ReproviderProvider } from '../../providers/reprovider/reprovider';
import { DataProvider } from '../../providers/data/data';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { EmailComposer } from '@ionic-native/email-composer';


@Component({
  selector: 'page-cold',
  templateUrl: 'cold.html',
})
export class ColdPage {
  home = HomePage;
  data = DataProvider;
  notes: String ="";
  msg;

  constructor(public navCtrl: NavController, public postsProvider: ReproviderProvider, 
              private dataProvider:DataProvider,private alertCtrl: AlertController,
              private db:AngularFireDatabase,public emailComposer:EmailComposer) {

  }
   
  ionViewDidLoad(){
    this.postsProvider.load();
  }
  updateState(i) {
    console.log('Cucumbers new state:');
  }

  storeInfoToDatabase(){
    let toSave= {
      Notes: this.notes,
    }
    this.presentAlert();
    return this.db.list('coldPoint').push(toSave);
}

presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'דו"ח נקודה קרה',
    subTitle: 'נשלח בהצלחה',
    buttons: [
      {
        text: "אישור",
        handler: () => {
          this.navCtrl.pop();
        }
      }
    ]
  });
  alert.present();

}




sendEmail() {
  this.msg = "הערות: " + this.notes;
  let email = {
    to: 'parentspatroljer@gmail.com',
    cc: '',
    attachments: [
      //this.currentImage
    ],
    subject: 'Test',
    body: this.msg+ '' ,
    isHtml: true
  };

  this.emailComposer.open(email);
}

}
