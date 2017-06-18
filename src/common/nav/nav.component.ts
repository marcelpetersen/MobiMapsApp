import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'mobi-nav',
    template: `
         <ion-navbar color="primary">
            <button ion-button menuToggle start>
                <ion-icon name="menu"></ion-icon>
            </button>
            <ion-title><img style="max-height:70px;" src="assets/img/logo.png" /></ion-title>
        </ion-navbar>

        `,
    styles: [``]
})
export class NavComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}