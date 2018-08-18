import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'done'
})
@Component({
  selector: 'page-done',
  templateUrl: 'done.html',
})
export class DonePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
