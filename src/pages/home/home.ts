import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { DataService } from "../../providers/index";
import { TabsComponent } from "../../common/index";

import { City } from "../../model/index";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  public cityList: City[];  

  constructor(public navCtrl: NavController, private api: DataService,
              private loadingCtrl: LoadingController) {
                

  }

  ngOnInit(): void {
    let loading = this.showLoading();
    loading.present();
    this.api.getCityWithMaps().subscribe((list: City[]) => {
      console.log(list);
      this.cityList = list.filter(city => city.city_image.url && city.city_map_leaflet);

      //testing purpose
      var belgarde : City = {
          name: 'Belgrade',
          id:99,
          city_image:  { 
            url: '',
            phone: {
                url: 'assets/img/city/belgrade.png'
                }
          },
          city_map_leaflet:'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      }; 
      this.cityList.push(belgarde);
      loading.dismiss();
    },(err) => {
      this.handleErrorFromApi(err);
      loading.dismiss();
    });

  }

  public goToMap(city: City) {
    console.log(city);
    this.navCtrl.push(TabsComponent, {selectedCity: city});
    //this.navCtrl.push(MapPage, { city: city });
  }

  private handleErrorFromApi(error) {

  }

  private showLoading() {
    return this.loadingCtrl.create({
      content: "Please wait..."
    });
    //this.loading.present();
  }

}
