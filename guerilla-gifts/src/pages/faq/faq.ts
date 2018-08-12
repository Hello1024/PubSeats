import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';

@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html'
})
export class FaqPage {

  constructor(public navCtrl: NavController, private dialogs: Dialogs) {



  }

  refund() {
    this.dialogs.alert('Hello world')
  .then(() => console.log('Dialog dismissed'))
  .catch(e => console.log('Error displaying dialog', e));
  }
}
