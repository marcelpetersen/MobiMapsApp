import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapPage } from "../index";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  public goToMap(city) {
    this.navCtrl.push(MapPage, { city: city });
  }

}
