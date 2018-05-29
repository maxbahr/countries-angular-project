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
  smallBaseColumns = ['flag', 'name', 'subregion', 'action'];
  baseColumns = ['flag', 'name', 'code', 'capital', 'region', 'subregion', 'population', 'area', 'action'];
  displayedColumns = this.baseColumns;
  windowsWidth: number = 1000;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private countriesService: CountriesService, private router: Router) { }

  ngOnInit() {
    this.getCountries();
    this.displayedColumns = (window.innerWidth <= this.windowsWidth) ? this.smallBaseColumns : this.baseColumns;
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

  onResize(event){
    this.displayedColumns = (event.target.innerWidth <= this.windowsWidth) ? this.smallBaseColumns : this.baseColumns;
  }
}
