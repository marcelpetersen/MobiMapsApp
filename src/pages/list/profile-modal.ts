import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { MapNode } from "../../model/index";

@Component({
    templateUrl: './profile-modal.html'
})
export class ProfileModalComponent implements OnInit {
    public bussiness: MapNode;
    constructor(private params: NavParams, private viewCtrl: ViewController ) { }

    ngOnInit() { 
        this.bussiness = this.params.data;
    }

    dismiss() {
    this.viewCtrl.dismiss();
    } 
}