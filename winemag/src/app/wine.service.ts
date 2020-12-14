import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class WineService {
    url='http://localhost:3000'

    constructor(private http: HttpClient){}

    getCountries():Promise<any>{
        return this.http.get<string[]>(this.url + '/countries').toPromise();
    }

    getCountryDetail(country: string, offset: number):Promise<any>{
        const params = (new HttpParams).set('offset', offset.toString())
        return this.http.get(this.url +`/country/${country}`, {params}).toPromise();
    }

    getWineDetail(id: string):Promise<any>{
        return this.http.get(this.url +`/wine/${id}`).toPromise();
    }

}