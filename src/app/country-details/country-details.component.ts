import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from '../country.interface';
import { CountriesService } from '../countries.service';
import { WikipediaMedia, Item } from '../wikipedia-media.interface';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {
  code: string;
  country: Country;
  borderCountries: Country[] = [];
  desc: any;
  media: WikipediaMedia;
  wikiImages: Item[];
  latlng: string;

  constructor(private countriesService: CountriesService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(
      params => this.code = params['code']
    );
  }

  ngOnInit() {
    this.prepareCountry();
  }

  prepareCountry(): void {
    this.countriesService.getCountryByCode(this.code)
      .subscribe(country => {
        this.country = country;
        console.log(this.country);
        this.getCountryDesc(this.country.name);
        this.getWikipediaMedia(this.country.name);
        this.getBorderCountriesByCode(this.country.borders);
      });
  }

  getBorderCountriesByCode(codes: string[]): void {
    codes.forEach(code => {
      this.countriesService.getCountryByCode(code)
        .subscribe(country => {
          this.borderCountries.push(country);
        });
    });

  }

  getCountryDesc(name: string): void {
    this.countriesService.getCountryWikipediaDesc(name)
      .subscribe(desc => {
        this.desc = desc;
        console.log(this.desc);
      });
  }

  getWikipediaMedia(name: string): void {
    this.countriesService.getCountryWikipediaMedia(name)
      .subscribe(media => {
        this.media = media;
        this.wikiImages = this.media.items.filter(x => x.type == 'image');
      });
  }

  goToDetails(code: string) {
    this.redirectTo('/country/' + code.toLocaleLowerCase());
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/DummyComponent', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  goToCountryRegion(country: Country): void {
    let region = country.region;
    if (region.toLowerCase() === 'americas') {
      let subregion = country.subregion;
      if (subregion.toLowerCase().startsWith('south')) {
        this.redirectTo('/region/south-america');
      } else {
        this.redirectTo('/region/northen-america');
      }
    } else {
      this.redirectTo('/region/' + region.toLocaleLowerCase());
    }
  }

  getLatLngNormalize(coord: number[]): string {
    let lat: number = coord[0];
    let lng: number = coord[1];
    let latStr: string;
    let lngStr: string;

    if (lat < 0) {
      latStr = lat * -1 + String.fromCharCode(176) + "S";
    } else {
      latStr = lat + String.fromCharCode(176) + "N";
    }

    if (lng < 0) {
      lngStr = lng * -1 + String.fromCharCode(176) + "W";
    } else {
      lngStr = lng + String.fromCharCode(176)+ "E";
    }

    return latStr + " " + lngStr;
  }
}
