import { Injectable, Inject } from '@angular/core';
import { DataService } from "./data.service";
import { L_TOKEN } from "./leaflet.service";

import { Geolocation } from '@ionic-native/geolocation';



//model
import { MapNode, ICONS } from "../model/index";

@Injectable()
export class MapService {

    private map: any;
    private nodeForMapList: MapNode[];
    public errorMessage: string;
    public marker: any;


	//current postioin
	private currentPostion: any;

	private accommodations: any;
	private agriculture_fishing_and_hunting: any;
	private adventure_tours: any;
	private arts_and_entertainment: any;
	private attractions: any;
	private cafes_and_bakeries: any;
	private currency_exchange: any;
	private dining: any;
	private fitness_clubs: any;
	private medical_and_dental: any;
	private night_life: any;
	private rentals: any;
	private shopping: any;
	private sightseeing: any;
	private spas: any;
	private sporting_goods: any;
	private tattoos: any;
	private tours_and_travel: any;
	private transportation_and_warehousing: any;

	private markerTemplate: string;
	

    constructor(@Inject(L_TOKEN) private L: any, private api: DataService, private geolocation: Geolocation) {}

    public initializeMap(mapNodeList , leafletMapUrl: string) {
		leafletMapUrl = leafletMapUrl || 'http://res.cloudinary.com/manoylo/image/upload/maps/vancouver/{z}/{x}/{y}.png';
        var mapSW = [0, 4096],
            mapNE = [4096, 0];
		var	maxZoom =4,
			minZoom = 2;

		//Belgrade testing
		if(leafletMapUrl === 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png') {
			 //maxZoom = 18;
			// minZoom = 10;
			this.map = this.L.map('map').setView([44.802575, 20.465540], 12);

			L.tileLayer(leafletMapUrl, {
				attribution: 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
				maxZoom: 18,
			}).addTo(this.map);

		} else {
			// declare map object
			this.map = this.L.map('map').setView([0, 0], 1);
		
				// reference the tiles
			this.L.tileLayer(leafletMapUrl, {
				minZoom: minZoom,
				maxZoom: maxZoom,
				continuousWorld: false,
				noWrap: true,
				crs: this.L.CRS.Simple
			}).addTo(this.map);

			this.map.setMaxBounds(new this.L.LatLngBounds(
				this.map.unproject(mapSW, this.map.getMaxZoom()),
				this.map.unproject(mapNE, this.map.getMaxZoom())
        	));

	    }
        
		this.nodeForMapList = mapNodeList;

		this.addDataToMap(this.map, this.nodeForMapList);
    }

	public goToCurrentPostion() {
		if(this.currentPostion) {
			this.map.flyTo([this.currentPostion.latitude,this.currentPostion.longitude]);
		}
		
	}

	public getNodesForCurrentMap() {

		//calculate distance if current positon exist
		if(this.currentPostion) {
			this.nodeForMapList.forEach((node : MapNode) => {
				//if node have lat and lng
				if(node.latitude && node.longitude) {
					var latlng = L.latLng(node.latitude, node.longitude);
						var distance = latlng.distanceTo([this.currentPostion.latitude, this.currentPostion.longitude]);
						node.distanceFromCurrentPosition = distance < 1000 ? Math.round((distance * 0.621371) * 100) / 100 : Math.round((distance * 0.621371) / 1000 * 100) / 100;
					}
			});
		}
		return this.nodeForMapList;
	}

	public getCurrentPostion() {
		return this.currentPostion;
	}

    private addDataToMap(map, serviceData: MapNode[]) {
              // defining map layer groups
        this.accommodations = new this.L.LayerGroup().addTo(map);
        this.agriculture_fishing_and_hunting = new this.L.LayerGroup().addTo(map);
        this.adventure_tours = new this.L.LayerGroup().addTo(map);
        this.arts_and_entertainment = new this.L.LayerGroup().addTo(map);
        this.attractions = new this.L.LayerGroup().addTo(map);
        this.cafes_and_bakeries = new this.L.LayerGroup().addTo(map);
        this.currency_exchange = new this.L.LayerGroup().addTo(map);
        this.dining = new this.L.LayerGroup().addTo(map);
        this.fitness_clubs = new this.L.LayerGroup().addTo(map);
        this.medical_and_dental = new this.L.LayerGroup().addTo(map);
        this.night_life = new this.L.LayerGroup().addTo(map);
        this.rentals = new this.L.LayerGroup().addTo(map);
        this.shopping = new this.L.LayerGroup().addTo(map);
        this.sightseeing = new this.L.LayerGroup().addTo(map);
        this.spas = new this.L.LayerGroup().addTo(map);
        this.sporting_goods = new this.L.LayerGroup().addTo(map);
        this.tattoos = new this.L.LayerGroup().addTo(map);
        this.tours_and_travel = new this.L.LayerGroup().addTo(map);
        this.transportation_and_warehousing = new this.L.LayerGroup().addTo(map);


        serviceData.forEach(element => {
            // console.log("X Axis: " + element.x_coordinate);
            // console.log("Y Axis: " + element.y_coordinate);
           
			this.markerFactoryMethod(element,map);
			
        }); //endforeach

		//fetch current postioin and show it
			this.geolocation.getCurrentPosition().then((resp) => {
				// resp.coords.latitude
				// resp.coords.longitude
				this.currentPostion = resp.coords;
				//L.marker([resp.coords.latitude,resp.coords.longitude]).addTo(this.map);
				
			}).catch((error) => {
				console.log('Error getting location', error);
			});
		

    
    } // addDataToMap

	private markerFactoryMethod(element: MapNode, map) {
			var icon = this.getIcon(element.business_category);
			var layer = this.getLayerForCategory(element.business_category);

			this.markerTemplate = `<img src="`+element.logo.url+`" style="width: 100px;">
					<h5 style="margin-top: 5px; margin-bottom: 2px;">`+element.business_name+`</h5>
						<p><small>`+element.full_address+`</small></p>
					<div id="apnd">
				
					<a class="btn btn-success" style="color: white;" href="tel:`+element.phone_number+`"><ion-icon name="call"></ion-icon> CALL US</a>
				
					<a style="color: white;" class="btn btn-success" href="#" onclick="window.open('`+element.website+`', '_self'); return false;" openurlexternal="true'"><i class="fa fa-globe" ></i> WEB</a>
				
					<a style="color: white;" class="btn btn-success" 
						href="https://maps.google.ca/maps?saddr=` + element.latitude + `,`+ element.longitude +`&daddr=`+element.full_address+`"><i class="fa fa-location-arrow" ></i> FIND US</a>
				
				</div>
				<div id="apnd">
					
				</div>
				<p><strong>Category:</strong> <br>`+element.business_category+`</p>`;
				

			if(icon != null && layer !=null) {
				// if a business is what we are looking for,  'https://maps.google.fr/maps?saddr=' + data.coords.latitude + ',' + data.coords.longitude + '&daddr=' + daddr
				this.L.marker(map.unproject([element.x_coordinate, element.y_coordinate], map.getMaxZoom()), {
						draggable: false,
						icon: icon
					}).bindPopup(
						this.markerTemplate).addTo(layer);
			}	
							
	}


	private getIcon(category: string) {
		switch (category) {
			case 'Accommodations':
				return this.L.icon(ICONS.accommodation_icon)
			case 'Adventure Tours':
				return this.L.icon(ICONS.adventure_tours_icon)
			case 'Arts, entertainment and recreation':
				return this.L.icon(ICONS.arts_and_entertainment_icon)
			case 'Agriculture, forestry, fishing and hunting':
				return this.L.icon(ICONS.agriculture_fishing_and_hunting_icon)
			case 'Attractions':
				return this.L.icon(ICONS.attractions_icon)
			case 'Dining':
				return this.L.icon(ICONS.dining_icon)
			case 'Currency Exchange':
				return null
			case 'Fitness Clubs':
				return this.L.icon(ICONS.fitness_clubs_icon)
			case 'Medical & Dental':
				return this.L.icon(ICONS.medical_and_dental_icon)
			case 'Night Life':
				return this.L.icon(ICONS.nightlife_icon)
			case 'Rentals':
				return this.L.icon(ICONS.rentals_icon)
			case 'Shopping':
				return this.L.icon(ICONS.shopping_icon)
			case 'Sightseeing':
				return this.L.icon(ICONS.sightseeing_icon)
			case 'Spas':
				return this.L.icon(ICONS.spas_icon)
			case 'Sporting Goods':
				return this.L.icon(ICONS.sporting_goods_icon)
			case 'Tattoos':
				return this.L.icon(ICONS.tattoos_icon)
			case 'Tours & Travel':
				return this.L.icon(ICONS.tours_and_travel_icon)
			case 'Transportation and warehousing':
				return this.L.icon(ICONS.transportation_and_warehousing_icon)
			default:
			    return null;
		}
	}

	private getLayerForCategory(category: string) {
		switch (category) {
			case 'Accommodations':
				return this.accommodations
			case 'Adventure Tours':
				return this.adventure_tours
			case 'Arts, entertainment and recreation':
				return this.arts_and_entertainment
			case 'Agriculture, forestry, fishing and hunting':
				return this.agriculture_fishing_and_hunting
			case 'Attractions':
				return this.attractions
			case 'Dining':
				return this.dining
			case 'Currency Exchange':
				return this.currency_exchange
			case 'Fitness Clubs':
				return this.fitness_clubs
			case 'Medical & Dental':
				return this.medical_and_dental
			case 'Night Life':
				return this.night_life
			case 'Rentals':
				return this.rentals
			case 'Shopping':
				return this.shopping
			case 'Sightseeing':
				return this.sightseeing
			case 'Spas':
				return this.spas
			case 'Sporting Goods':
				return this.sporting_goods
			case 'Tattoos':
				return this.tattoos
			case 'Tours & Travel':
				return this.tours_and_travel
			case 'Transportation and warehousing':
				return this.transportation_and_warehousing
			default:
				return null;
		}
	}
}