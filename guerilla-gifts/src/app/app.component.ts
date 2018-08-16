import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device';


import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  @ViewChild('myNav') nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, storage: Storage, public device: Device) {
    platform.ready().then(async () => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      if (this.device.platform == 'browser') {
        // Monkey patch Sentry because they didn't test the 'browser' platform...
        // @ts-ignore: Sentry exists in the window object
        Sentry.CordovaBackend.prototype.nativeCall = function () {
            return new Promise(function (resolve, reject) {
                reject('Im a browser, no native stuff...');
            });
        };
        // @ts-ignore: Sentry exists in the window object
        Sentry.CordovaBackend.prototype.isCordova = function () { return false; };
      }
      // @ts-ignore: Sentry exists in the window object
      Sentry.init({ dsn: 'https://99d224e9c9db434c81b3bffc0735ca4d@sentry.io/1263173' });

      // set a uuid if one doesn't exist.
      let query_uuid = platform.getQueryParam('uuid');
      let uuid = await storage.set('uuid', await storage.get('uuid') || query_uuid || uuidv4());

      if (query_uuid && uuid != query_uuid) {
        // ignore errors and response
        try {
          await fetch('https://erraticpacket.com/api/linkuuid?a='+query_uuid+'&b='+uuid);
        }catch(e){}
      }

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngAfterViewInit() {
    // Let's navigate from TabsPage to Page1
    this.nav.push(LoginPage);
  }

}


function uuidv4() {
  // @ts-ignore: javascript type crazyness which works...
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}
