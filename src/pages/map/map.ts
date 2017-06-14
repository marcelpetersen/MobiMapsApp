import { Component } from '@angular/core';
import 'leaflet';
import { NavController, NavParams } from 'ionic-angular';
import { MapService } from "../../providers/index";
/**
 * Generated class for the Map page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  private cityName: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private map: MapService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Map');
         this.cityName = this.navParams.get('city');
         if(this.cityName) {
            this.map.initializeMap(this.cityName);
         }else {
           //throw error
         }
         
			
  }


}