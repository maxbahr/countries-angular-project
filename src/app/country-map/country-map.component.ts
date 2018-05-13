import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'country-map',
  templateUrl: './country-map.component.html',
  styleUrls: ['./country-map.component.css']
})
export class CountryMapComponent implements OnInit {
  @Input() lat: number;
  @Input() lng: number;
  bounds: any;

  constructor() { }

  ngOnInit() {
    // this.bounds  = new LatLngBounds();
  }

}
