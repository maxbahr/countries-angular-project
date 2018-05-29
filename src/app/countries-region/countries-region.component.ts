import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from '../country.interface';
import { CountriesService } from '../countries.service';

@Component({
  selector: 'countries-region',
  templateUrl: './countries-region.component.html',
  styleUrls: ['./countries-region.component.css']
})
export class CountriesRegionComponent implements OnInit {
  countries: Country[] = null;
  countriesBySubregion: any[] = null;
  regions: string[];
  subregions: string[];
  region: string;
  southAmerica: string ='South America';
  value: number = 50;

  constructor(private countriesService: CountriesService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(
      params => this.region = params['region']
    );
    console.log('region', this.region);
  }

  ngOnInit() {    
    this.getCountriesByRegion();
  }

  getCountriesByRegion(): void {
    let regionUrl = this.region;
    if (this.isAmericasRegion()){
      regionUrl = 'americas';
    }
    this.countriesService.getCountriesByRegion(regionUrl)
      .subscribe(countries => {
        if (this.isAmericasRegion()){
          if (this.isSouthAmericasRegion()) {
            this.countries = countries.filter(country => this.isCountryFromSouthAmerica(country));
          } else {
            this.countries = countries.filter(country => !this.isCountryFromSouthAmerica(country));
          }
        } else {
          this.countries = countries;  
        }
        this.region = this.countries[0].region;
        console.log('country', this.countries);
        this.getRegions();
        this.getSubRegions();
      });
  }

  isAmericasRegion(): boolean {
    return this.region.toLowerCase().endsWith('america');
  }

  isSouthAmericasRegion(): boolean {
    return this.region.toLowerCase().startsWith('south');
  }

  isCountryFromSouthAmerica(country: Country): boolean {
    return this.southAmerica.indexOf(country.subregion) > -1
  }

  goToDetails(code: string) {
    this.redirectTo('/country/' + code.toLocaleLowerCase());
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/DummyComponent', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  getCountriesBySubRegion(subregion: string): void {
    console.log("changed to subregion: " + subregion);
        this.countriesBySubregion = this.countries.map(country => {
          return { region: country.region, subregion: country.subregion, name: country.name }
        }).filter(x => x.subregion === subregion);
  }

  // getCountriesByRegion(region: string): void {
  //   console.log("changed to region: " + region);
  //       this.countriesBySubregion = this.countries.map(country => {
  //         return { region: country.region, subregion: country.subregion, name: country.name }
  //       }).filter(x => x.region === region);
  // }

  getRegions(): void {
        this.regions = this.countries.map(country => '[ ' + country.region.toLocaleUpperCase() + ' ]   ' + country.subregion).filter((v, i, a) => a.indexOf(v) === i).sort();
  }

  getSubRegions(): void {
        this.subregions = this.countries.map(country => country.subregion).filter((v, i, a) => a.indexOf(v) === i).sort();
  }
}
