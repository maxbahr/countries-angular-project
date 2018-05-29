import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'country-carousel',
  templateUrl: './country-carousel.component.html',
  styleUrls: ['./country-carousel.component.css']
})
export class CountryCarouselComponent implements OnInit {
  imgDir = '../../assets/img/';
  images: any[] = [
    { src: this.imgDir + 'flags1.jpg', alt: 'Flags', label: 'National flags', desc: 'When a national flag is displayed together with the national flags of other countries, all the flags should be of approximately equal size and must be flown at an equal height.'},
    { src: this.imgDir + 'flags2.jpg', alt: 'Map', label: 'Political Map', desc: 'Political maps are designed to show governmental boundaries of countries, states, and counties, the location of major cities, and they usually include significant bodies of water.'},
    { src: this.imgDir + 'flags3.jpg', alt: 'People', label: 'Nationalities, Countries and the People', desc: ' The world population is the total number of humans currently living, and was estimated to have reached 7.62 billion as of May 2018.'},
  ]

  constructor() { }

  ngOnInit() {
  }

}
