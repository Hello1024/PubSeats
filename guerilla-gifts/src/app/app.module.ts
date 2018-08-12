import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { InAppPurchase } from '@ionic-native/in-app-purchase';

import { FaqPage } from '../pages/faq/faq';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { OrderPage } from '../pages/order/order';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    FaqPage,
    ContactPage,
    HomePage,
    OrderPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FaqPage,
    ContactPage,
    HomePage,
    OrderPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppPurchase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
