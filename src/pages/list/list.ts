import { Component, OnInit } from '@angular/core';
import { DataService, MapService } from "../../providers/index";
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';

//model
import { MapNode, City } from "../../model/index";

//modal component
import { ProfileModalComponent } from "./profile-modal";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit {
  listOfMapNode: MapNode[];
  private selectedCity: City;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
              private loadingCtrl: LoadingController, private dataApi: DataService,
              private mapApi: MapService) {  

              }


  ngOnInit(): void {
    this.selectedCity = this.navParams.data;

    this.listOfMapNode = this.mapApi.getNodesForCurrentMap();
    
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }

  presentModal(selectedNode: MapNode) {
    var dataForModal = {
        selectedNode: selectedNode,
        cityUrl : this.selectedCity.city_image.phone.url
    };
    let modal = this.modalCtrl.create(ProfileModalComponent, dataForModal);
    modal.present();

    //listener
     modal.onDidDismiss(data => {
        console.log(data);
        if(data) { //if data was send from modal (case when it is clicked on show on map)
          this.mapApi.goToPosition(data.latitude, data.longitude);
          this.navCtrl.parent.select(0);
        }
        
    });

  }

}
