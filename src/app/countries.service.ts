import { Injectable } from '@angular/core';
import { Country } from './country.interface';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WikipediaMedia } from './wikipedia-media.interface';

@Injectable()
export class CountriesService {

  constructor(private http: HttpClient) {  }

  getCountries(): Observable<Country[]> {  
    const url = 'https://restcountries.eu/rest/v2/all?fields=name;flag;alpha3Code';  
    return this.http.get<Country[]>(url);
  }
  
  getCountryByCode(code: string): Observable<Country> {    
    const url = `https://restcountries.eu/rest/v2/alpha/${code}`;
    console.log(url);
    return this.http.get<Country>(url);
  }

  getCountryWikipediaDesc(name: string): Observable<any>{
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${name}`;
    console.log(url);
    return this.http.get<any>(url);
  }

  getCountryWikipediaMedia(name: string): Observable<WikipediaMedia>{
    const url = `https://en.wikipedia.org/api/rest_v1/page/media/${name}`;
    console.log(url);
    return this.http.get<WikipediaMedia>(url);
  }
}
