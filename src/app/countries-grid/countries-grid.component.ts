import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CountriesService } from '../countries.service';
import { Router } from '@angular/router';

@Component({
  selector: 'countries-grid',
  templateUrl: './countries-grid.component.html',
  styleUrls: ['./countries-grid.component.css']
})
export class CountriesGridComponent implements OnInit {
  displayedColumns = ['flag', 'name', 'code', 'capital', 'region', 'subregion', 'population', 'area', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private countriesService: CountriesService, private router: Router) { }

  ngOnInit() {
    this.getCountries();

  }

  getCountries(): void {
    this.countriesService.getCountries()
      .subscribe(countries => {
        for(let i = 0; i < countries.length; i++){
          countries[i]['index'] = i;
        }
        this.dataSource = new MatTableDataSource(countries);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  goToDetails(code: string) {
    this.redirectTo('/country/' + code.toLocaleLowerCase());
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/DummyComponent', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
}
