import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage, MapPage,ListPage, ProfileModalComponent } from '../pages/index';
import { TabsComponent, NavComponent } from "../common/index";
import { L_TOKEN , DataService, MapService } from "../providers/index";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

declare let L : Object;

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    ListPage,
    ProfileModalComponent,
    TabsComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{tabsPlacement: 'top'}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    ListPage,
    ProfileModalComponent,
    TabsComponent,
    NavComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
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
