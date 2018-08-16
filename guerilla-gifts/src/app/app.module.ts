import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Device } from '@ionic-native/device';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { Dialogs } from '@ionic-native/dialogs';


import { FaqPage } from '../pages/faq/faq';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { OrderPage } from '../pages/order/order';
import { DonePage } from '../pages/done/done';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as Sentry from 'sentry-cordova';

class SentryIonicErrorHandler extends IonicErrorHandler {
  handleError(error) {
    super.handleError(error);
    try {
      Sentry.captureException(error.originalError || error);
    } catch (e) {
      console.error(e);
    }
  }
}

@NgModule({
  declarations: [
    MyApp,
    FaqPage,
    ContactPage,
    HomePage,
    OrderPage,
    DonePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FaqPage,
    ContactPage,
    HomePage,
    OrderPage,
    TabsPage,
    DonePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppPurchase,
    Dialogs,
    Device,
    {provide: ErrorHandler, useClass: SentryIonicErrorHandler}
  ]
})
export class AppModule {}
