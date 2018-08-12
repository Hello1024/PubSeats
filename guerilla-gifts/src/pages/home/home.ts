import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrderPage } from '../order/order';
import { Device } from '@ionic-native/device';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  orderPage: any;
  constructor(public navCtrl: NavController, public device: Device) {
     this.orderPage=OrderPage;
  }


}
