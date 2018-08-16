import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html'
})
export class FaqPage {

  constructor(public navCtrl: NavController, private dialogs: Dialogs, public storage: Storage) {

  }

  async refund() {
    let resp = await this.dialogs.alert(
    'We will refund your last item, no questions asked. Fran or I will refund you within a week.  Simply drop us an email to support@erraticpacket.com with your userid ('+(await this.storage.get('uuid')).substr(0,5)+')',
    'Sorry to see you go!')
  }
}
