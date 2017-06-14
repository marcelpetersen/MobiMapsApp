import { Injectable, Inject } from '@angular/core';
import { DataService } from "./data.service";
import { L_TOKEN } from "./leaflet.service";


//model
import { MapNode, ICONS } from "../model/index";

@Injectable()
export class MapService {

    private map: any;
    private nodeForMapList: MapNode[];
    public errorMessage: string;
    public marker: any;


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

    constructor(@Inject(L_TOKEN) private L: any, private api: DataService) {}

    public initializeMap(cityName) {
        var mapSW = [0, 4096],
            mapNE = [4096, 0];

        // declare map object
        this.map = this.L.map('map').setView([0, 0], 2);

        // reference the tiles
        this.L.tileLayer('http://res.cloudinary.com/manoylo/image/upload/maps/vancouver/{z}/{x}/{y}.png', {
            minZoom: 2,
            maxZoom: 4,
            continuousWorld: false,
            noWrap: true,
            crs: this.L.CRS.Simple
        }).addTo(this.map);

        this.map.setMaxBounds(new this.L.LatLngBounds(
            this.map.unproject(mapSW, this.map.getMaxZoom()),
            this.map.unproject(mapNE, this.map.getMaxZoom())
        ));



        this.api.getByCity(cityName).subscribe((node) => {
            this.nodeForMapList = node;
            console.log(node);

            this.addDataToMap(this.map, this.nodeForMapList);
        },
            error => this.errorMessage = <any>error
        );

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
				<p><strong>Category:</strong> <br>`+element.business_name+`</p>`;
				

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
				return ICONS.accommodation_icon
			case 'Adventure Tours':
				return ICONS.adventure_tours_icon
			case 'Arts, entertainment and recreation':
				return ICONS.arts_and_entertainment_icon
			case 'Agriculture, forestry, fishing and hunting':
				return ICONS.agriculture_fishing_and_hunting_icon
			case 'Attractions':
				return ICONS.attractions_icon
			case 'Dining':
				return ICONS.dining_icon
			case 'Currency Exchange':
				return null
			case 'Fitness Clubs':
				return ICONS.fitness_clubs_icon
			case 'Medical & Dental':
				return ICONS.medical_and_dental_icon
			case 'Night Life':
				return ICONS.nightlife_icon
			case 'Rentals':
				return ICONS.rentals_icon
			case 'Shopping':
				return ICONS.shopping_icon
			case 'Sightseeing':
				return ICONS.sightseeing_icon
			case 'Spas':
				return ICONS.spas_icon
			case 'Sporting Goods':
				return ICONS.sporting_goods_icon
			case 'Tattoos':
				return ICONS.tattoos_icon
			case 'Tours & Travel':
				return ICONS.tours_and_travel_icon
			case 'Transportation and warehousing':
				return ICONS.transportation_and_warehousing_icon
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