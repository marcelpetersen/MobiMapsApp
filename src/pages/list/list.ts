import { Component, OnInit } from '@angular/core';
import { DataService } from "../../providers/index";
import { NavController, NavParams, LoadingController  } from 'ionic-angular';

//model
import { MapNode, City } from "../../model/index";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit {
  private loading: any;
  listOfMapNode: MapNode[];
  private selectedCity: City;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private dataApi: DataService) {  }


  ngOnInit(): void {
    this.selectedCity = this.navParams.data;
    this.showLoading();
    this.dataApi.getByCity(this.selectedCity.name).subscribe((list : MapNode[]) => {
      this.listOfMapNode = list;
      this.loading.dismiss();
    }, (error) => {
      console.log(error);
      this.loading.dismiss();
    });
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }

  private showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loading.present();
  }


}
