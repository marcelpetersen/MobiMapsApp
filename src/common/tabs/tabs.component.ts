import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ListPage, MapPage } from "../../pages/index";
import { DataService, MapService } from "../../providers/index";
import { City } from "../../model/index";

@Component({
    template: `
        <ion-tabs color="primary">
            <ion-tab tabTitle="MAPS" [root]="tab1" [rootParams]="selectedCity"></ion-tab>
            <ion-tab tabTitle="LIST" [root]="tab2" [rootParams]="selectedCity"></ion-tab>
        </ion-tabs>

        `,
    styles: [``]
})
export class TabsComponent implements OnInit {
  private selectedCity: City;
//   private mapNodeLists: MapNode[];
//   private errorMessage: any;
//   private dataMapContainer: any;
  tab1: any;
  tab2: any;

  constructor(private params: NavParams, private api: DataService, private map: MapService) {
    this.tab1 = MapPage;
    this.tab2 = ListPage;
    this.selectedCity = params.get('selectedCity');
  }

  ngOnInit(): void {
        //  this.api.getByCity(this.selectedCity.name).subscribe((mapNodeLists) => {
           
        //     console.log(mapNodeLists);
        //     this.mapNodeLists = mapNodeLists;

        //     this.dataMapContainer = {
        //         mapNodeLists: this.mapNodeLists,
        //         selectedCity: this.selectedCity
        //     };

        //     //this.map.initializeMap(mapNodeLists, this.selectedCity.city_map_leaflet);
        // },
        //     error => this.errorMessage = <any>error
        // );
    }
}