import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'country-map',
  templateUrl: './country-map.component.html',
  styleUrls: ['./country-map.component.css']
})
export class CountryMapComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
    
  @Input() lat: number;
  @Input() lng: number;

  constructor() { }

  ngOnInit() {
    const mapProp = {
      center: new google.maps.LatLng(this.lat, this.lng),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }
}
