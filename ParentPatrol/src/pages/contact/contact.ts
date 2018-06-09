import { Component } from '@angular/core';
import { NavController ,NavParams,IonicPage, LoadingController} from 'ionic-angular';
import { ReproviderProvider } from '../../providers/reprovider/reprovider';
import { DataProvider } from '../../providers/data/data';
import { AngularFireDatabase, AngularFireObject  } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { AlertController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { AngularFirestore } from 'angularfire2/firestore';
import { LocationsProvider } from '../../providers/locations/locations';
import {locationItem} from '../../models/locationItem.interface'
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'

})
export class ContactPage {
  data : any;
  selected= [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];  
  checked : boolean = false;
  msg: String;
  str: String = "";
  team: String ="";
  morePlaces: string="";
  description: String ="";
  groupsNum: Number=0;
  membersInGroup: Number=0;
  averageAge: string="";
  alcohol: String ="";
  drugs: String ="";
  exeptions: String ="";
  details: String ="";
  handle: string ="";
  notes: String ="";
  select: any;
  insidePlaces: string[];
  keys: any[] = [];
  constructor(public navCtrl: NavController,private alertCtrl: AlertController, 
              public postsProvider: ReproviderProvider, public emailComposer:EmailComposer,
              private db:AngularFirestore,public navParams: NavParams,
              private afs: AngularFirestore, private loading: LoadingController, private lp:LocationsProvider) {
              this.select = navParams.get('data');
                const settings = { timestampsInSnapshots: true };
                afs.firestore.settings(settings);

                let load = this.loading.create();
                load.present()
                this.lp.getList(this.select)
                this.lp.getList(this.select).then(res => {
                  this.keys = res;
                  load.dismiss()
                }).catch(err => {
                  load.dismiss()
                })
                
               
  }

  getPlace(name: string): Promise<string[]>{
    return new Promise<any>((resolve, reject) => {
      this.afs.collection<any>(name).valueChanges().subscribe(res => {
        console.log(res)
        resolve(res[0].location)
      }, err => {
        reject(err)
      })
    })
  }

  /*makeMessage() {
      for(var i = 0 ; i < this.postsProvider.posts.length ; i++) {
        if(this.selected[i] == true) {
            this.str +="\r\n"+ this.postsProvider.posts[i].title;
        }
      }
      this.msg = "דוח נקודה חמה \r\n צוות: " + this.team + " \r\n שמות המתנדבים: " + this.volenteersName
      + "\r\n תאריך: " + this.myDate + "\r\n מיקום: "+this.str+ "\r\n תיאור כללי: " + this.description 
      + "\r\n במידה והייתה היתקלות עם אלכוהול וסמים - כמה? " + this.alcoholOrDrugs
      + "\r\n אירועים חריגים: " + this.exeptions + "\r\n פרטי הנער או הנערה: " + this.details
      + "\r\n דרכי טיפול: " + this.handle + "\r\n הערות: " + this.notes;
      //console.log(this.msg);
      return this.msg;
    }
  send() {
  //  this.str= this.makeMessage();
    console.log (this.str);
    
    let email = {
      to: "parentspatroljer@gmail.com",
      subject: "",
      body:"" + this.str,
      isHtml: true,
      app:"Gmail"
  }
  this.emailComposer.open(email);
  console.log ("heeeeeeeeyyyyyyy");
}*/

  ionViewDidLoad(){

  }

  updateState(i) {
    console.log('Cucumbers new state:' + this.selected[i] +" "+i);
  }


  storeInfoToDatabase(){
    let toSave= {
        Team: this.select,
        MyDate: this.navParams.get('myDate'),
        StartTime: this.navParams.get('startTime'),
        EndTime: this.navParams.get('endTime'),
        TeamNumbe: this.navParams.get('teamNumber'),
        VolenteersName: this.navParams.get('volenteersName'),
        MorePlaces: this.morePlaces,
        Description: this.description,
        GroupNum: this.groupsNum,
        MembersInGroup: this.membersInGroup,
        AverageAge: this.averageAge,
        underAlcoho: this.alcohol,
        underDrugs: this.drugs,
        Exeptions: this.exeptions,
        Handle: this.handle,
        Notes: this.notes,
        One: this.selected[0],
        Two: this.selected[1],
        Three: this.selected[2],
        Four: this.selected[3],
        Five: this.selected[4],
        Six: this.selected[5],
        Seven: this.selected[6],
        Eight: this.selected[7],
        Nine: this.selected[8],
        Ten: this.selected[9],
        Eleven: this.selected[10],
        Twelve: this.selected[11],
        Thirteen: this.selected[12],
        Fourteen: this.selected[13],
        Fifteen: this.selected[14],
        Sixteen: this.selected[15],
        Seventeen: this.selected[16],
        Eighteen: this.selected[17],
        Nineteen:this.selected[18],
        Twenty: this.selected[19],
        TwentyOne: this.selected[20],
        TwentyTwo: this.selected[21],
        TwentyThree: this.selected[22]   
    }
    this.presentAlert();
    this.sendEmail();
    return this.db.collection('HotSpot').add(toSave);
}

presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'דוח נקודה חמה',
    subTitle: 'נשלח בהצלחה',
    buttons: [
      {
        text: "OK",
        handler: () => {
          this.navCtrl.pop();
        }
      }
    ]
  });
  alert.present();
}

sendEmail() {
  this.msg = "דוח נקודה חמה \r\n צוות: " + this.team + " \r\n שמות המתנדבים: " + this.navParams.get('volenteersName')
  + "\r\n תאריך: " + this.navParams.get('myDate') + "\r\n מיקום: "+this.str+ "\r\n תיאור כללי: " + this.description 
  + "\r\n במידה והייתה היתקלות עם אלכוהול - כמה? " + this.alcohol
  + "\r\n במידה והייתה היתקלות עם סמים - כמה? " + this.drugs
  + "\r\n אירועים חריגים: " + this.exeptions + "\r\n פרטי הנער או הנערה: " + this.details
  + "\r\n דרכי טיפול: " + this.handle + "\r\n הערות: " + this.notes;
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