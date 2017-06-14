import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage, MapPage } from '../pages/index';
import { ListPage } from '../pages/list/list';
import { L_TOKEN , DataService, MapService } from "../providers/index";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

declare let L : Object;

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { 
      provide: L_TOKEN, 
      useValue: L 
    },
    MapService,
    DataService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
