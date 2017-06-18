import { Component, OnInit } from '@angular/core';
import 'leaflet';
import { NavController, NavParams } from 'ionic-angular';
import { MapService, DataService } from "../../providers/index";
import { City } from "../../model/city";
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
export class MapPage implements OnInit {
  public selectedCity: City;
  private errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private map: MapService, private api: DataService) {
    
  }

   ngOnInit(): void {
        this.selectedCity = this.navParams.data;
          this.api.getByCity(this.selectedCity.id).subscribe((mapNodeLists) => {
           
          this.map.initializeMap(mapNodeLists, this.selectedCity.city_map_leaflet);
        },
            error => this.errorMessage = <any>error
        );
  }

  public goToCurrentPositioin() {
    this.map.goToCurrentPostion();
  }

  }

