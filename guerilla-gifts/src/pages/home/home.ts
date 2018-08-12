import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { OrderPage } from '../order/order';


import { InAppPurchase } from '@ionic-native/in-app-purchase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private iap: InAppPurchase, public plt: Platform) {
 
  }

  onClickMe() {
    if (!this.plt.is('cordova')) {
      this.navCtrl.push(OrderPage);
    }
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

}
