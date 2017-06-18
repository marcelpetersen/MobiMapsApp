import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, ViewController } from 'ionic-angular';
import { MapNode } from "../../model/index";


@Component({
    templateUrl: './profile-modal.html'
})
export class ProfileModalComponent implements OnInit {
    public bussiness: MapNode;
    public cityUrl: string;
    constructor(private navCtrl: NavController, private params: NavParams, private viewCtrl: ViewController ) { }

    ngOnInit() { 
        this.bussiness = this.params.data.selectedNode;
        this.cityUrl = this.params.data.cityUrl;
    }

    goToMap() {
        // this.viewCtrl.dismiss({
        //     latitude: this.bussiness.y_coordinate,
        //     longitude: this.bussiness.x_coordinate });
        
        this.viewCtrl.dismiss();
    }

    dismiss() {
    this.viewCtrl.dismiss();
    } 
}