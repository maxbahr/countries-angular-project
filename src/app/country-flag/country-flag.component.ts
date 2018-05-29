import { Component, OnInit } from '@angular/core';
import { Country } from '../country.interface';
import { CountriesService } from '../countries.service';
import { Router } from '@angular/router';

@Component({
  selector: 'country-flags',
  templateUrl: './country-flag.component.html',
  styleUrls: ['./country-flag.component.css']
})
export class CountryFlagsComponent implements OnInit {
  countries: Country[] = null;

  min: number = 75;
  max: number = 150;
  step: number = 25;
  value: number = 50;

  constructor(private countriesService: CountriesService, private router: Router) { }

  ngOnInit() {
    this.getCountries();
  }

  getCountries(): void {
    this.countriesService.getCountries()
      .subscribe(countries => {
        this.countries = countries;
      });
  }

  goToDetails(code: string) {
    this.router.navigateByUrl('/country/' + code.toLocaleLowerCase());
  }

  formatValueSlider(value: number | null) {
    if (!value) {
      return 0 + 'px';
    }

    return value + 'px';
  }
}
