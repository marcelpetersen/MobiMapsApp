import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

//model
import { MapNode } from '../model/index'

@Injectable()
export class DataService {
    private apiUrlBase = 'http://www.mobimaps.ca/api/merchants';

    constructor(private http: Http) {
    }

    public getApi(): Observable<MapNode[]> {
        return this.http.get(this.apiUrlBase)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    public getByCity(cityName) : Observable<MapNode[]> { 
        //http://www.mobimaps.ca/api/merchants/get_by_city?city=Vancouver
        return this.http.get(this.apiUrlBase + '/get_by_city?city='+ cityName)
                        .map(this.extractData)
                        .catch(this.handleError);
    } 


    private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

    private handleError(error: Response | any) {

        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}