import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Device } from '@ionic-native/device';

import { InAppPurchase } from '@ionic-native/in-app-purchase';


/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private iap: InAppPurchase, public device: Device) {
  }

  appBuy() {
    this.iap
	 .getProducts(['prod1', 'prod2'])
	 .then((products) => {
	   console.log(products);
	    //  [{ productId: 'com.yourapp.prod1', 'title': '...', description: '...', price: '...' }, ...]
	 })
	 .catch((err) => {
	   console.log(err);
	 });
  }

  paypalBuy() {

  }

}
