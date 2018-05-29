import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Country } from '../country.interface';
import { CountriesService } from '../countries.service';
import { Router } from '@angular/router';

@Component({
  selector: 'country-select-autocomplete',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.css']
})
export class CountrySelectComponent implements OnInit {
  countryCtrl: FormControl;
  filteredCountry: Observable<any[]>;
  countries: Country[];
  value: string;

  constructor(private countriesService: CountriesService, private router: Router) {
    this.countryCtrl = new FormControl();
  }

  ngOnInit() {
    this.getCountries();
  }

  getCountries(): void {
    this.countriesService.getCountries()
      .subscribe(countries => {
        this.countries = countries;
        this.prepareFilteredCountry();
      });
  }

  prepareFilteredCountry(): void {
    this.filteredCountry = this.countryCtrl.valueChanges.pipe(
      startWith(''),
      map(countryName => countryName ? this.filterCountry(countryName) : this.countries.slice())
    )
  }

  filterCountry(name: string): Country[] {
    return this.countries.filter(country =>
      country.name.toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) === 0);
  }

  goToDetails(code: string) {
    this.redirectTo('/country/' + code.toLocaleLowerCase());
    this.countryCtrl.reset();
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/DummyComponent', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

}
