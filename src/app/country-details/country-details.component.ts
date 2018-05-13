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
}
