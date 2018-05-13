import { Component, OnInit } from '@angular/core';
import { Country } from '../country.interface';
import { CountriesService } from '../countries.service';
import { Router } from '@angular/router';

@Component({
  selector: 'country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  countries: Country[] = null;

  constructor(private countriesService: CountriesService, private router: Router) { }

  ngOnInit() {
    console.log("Country init");
    this.getCountries();
  }

  getCountries(): void {
    this.countriesService.getCountries()
      .subscribe(countries => this.countries = countries);
  }

  goToDetails(code: string) {
    this.router.navigateByUrl('/country/' + code.toLocaleLowerCase());
  }
}
