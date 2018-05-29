import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'countries-world-map',
  templateUrl: './countries-world-map.component.html',
  styleUrls: ['./countries-world-map.component.css']
})
export class CountriesWorldMapComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToRegion(region: string) {
    this.redirectTo('/region/' + region.toLocaleLowerCase());
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/DummyComponent', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
}
