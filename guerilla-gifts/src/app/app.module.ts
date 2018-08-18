import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Device } from '@ionic-native/device';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { Dialogs } from '@ionic-native/dialogs';


import { FaqPageModule } from '../pages/faq/faq.module';
import { ContactPageModule } from '../pages/contact/contact.module';
import { HomePageModule } from '../pages/home/home.module';
import { OrderPageModule } from '../pages/order/order.module';
import { DonePageModule } from '../pages/done/done.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as Sentry from 'sentry-cordova';

export class SentryIonicErrorHandler extends IonicErrorHandler {
  handleError(error) {
    super.handleError(error);
    try {
      Sentry.captureException(error.originalError || error);
    } catch (e) {
      console.error(e);
    }
    alert('Sorry - something went wrong!  Try refreshing/updating the app, and if the problem persisists drop a message to support@erraticpacket.com.')
  }
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    FaqPageModule,
    ContactPageModule,
    HomePageModule,
    OrderPageModule,
    DonePageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
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
