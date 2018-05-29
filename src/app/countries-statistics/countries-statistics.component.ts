import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Chart } from 'chart.js';
import { Country } from '../country.interface';

@Component({
  selector: 'countries-statistics',
  templateUrl: './countries-statistics.component.html',
  styleUrls: ['./countries-statistics.component.css']
})
export class CountriesStatisticsComponent implements OnInit {
  countries: Country[];  
  chartArea: any[] = [];
  chartPopulation: any[] = [];
  chartLessPopulation: any[] = [];
  chartNeighborhood: any[] = [];

  constructor(private countriesService: CountriesService) { }

  ngOnInit() {
    this.countriesService.getCountries()
      .subscribe(countries => {
        this.countries = countries
        console.log(this.countries);

        let countriesData = this.countries.map(c => ({'name': c.name, 'area': c.area, 'population': c.population, 'neighborhood': c.borders.length}))
        
        
        let countryArea = countriesData.sort((a,b) => {
          if (a.area > b.area) {
            return -1;
          } else if (a.area < b.area) {
            return 1;
          }          
          return 0;
        }).slice(0, 10);


        this.chartArea = new Chart('canvas-area', {
          type: 'bar',
          data: {
            labels: countryArea.map(x => x.name),
            datasets: [
              { 
                data: countryArea.map(x => x.area),
                label: 'Area [km2]',
                backgroundColor: ['rgba(255, 0, 0, 0.2)', 'rgba(255, 198, 179, 0.6)', 'rgba(255, 217, 179, 0.6)', 'rgba(255, 236, 179, 0.6)', 'rgba(255, 255, 179, 0.6)', 'rgba(236, 255, 179, 0.6)', 'rgba(217, 255, 179, 0.6)', 'rgba(198, 255, 179, 0.6)', 'rgba(179, 255, 179, 0.6)', 'rgba(179, 255, 255, 0.6)' ],
                borderWidth: 1,
                borderColor: ['rgb(255, 0, 0)', 'rgb(255, 64, 0)', 'rgb(255, 128, 0)', 'rgb(255, 191, 0)', 'rgb(255, 255, 0)', 'rgb(191, 255, 0)', 'rgb(128, 255, 0)', 'rgb(64, 255, 0)', 'rgb(0, 255, 0)', 'rgb(0, 255, 255)' ],

                fill: true
              }
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });

        let countryPopulation = countriesData.sort((a,b) => {
          if (a.population > b.population) {
            return -1;
          } else if (a.population < b.population) {
            return 1;
          }          
          return 0;
        }).slice(0, 10);

        this.chartPopulation = new Chart('canvas-population', {
          type: 'horizontalBar',
          data: {
            labels: countryPopulation.map(x => x.name),
            datasets: [
              { 
                data: countryPopulation.map(x => x.population),
                backgroundColor: ['rgba(255, 0, 0, 0.2)', 'rgba(255, 198, 179, 0.6)', 'rgba(255, 217, 179, 0.6)', 'rgba(255, 236, 179, 0.6)', 'rgba(255, 255, 179, 0.6)', 'rgba(236, 255, 179, 0.6)', 'rgba(217, 255, 179, 0.6)', 'rgba(198, 255, 179, 0.6)', 'rgba(179, 255, 179, 0.6)', 'rgba(179, 255, 255, 0.6)' ],
                borderWidth: 1,
                borderColor: ['rgb(255, 0, 0)', 'rgb(255, 64, 0)', 'rgb(255, 128, 0)', 'rgb(255, 191, 0)', 'rgb(255, 255, 0)', 'rgb(191, 255, 0)', 'rgb(128, 255, 0)', 'rgb(64, 255, 0)', 'rgb(0, 255, 0)', 'rgb(0, 255, 255)' ],
                fill: false
              }
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });

        let countryLessPopulation = countriesData.sort((a,b) => {
          if (a.population > b.population) {
            return 1;
          } else if (a.population < b.population) {
            return -1;
          }          
          return 0;
        }).slice(0, 10);

        this.chartLessPopulation = new Chart('canvas-less-population', {
          type: 'line',
          data: {
            labels: countryLessPopulation.map(x => x.name),
            datasets: [
              { 
                data: countryLessPopulation.map(x => x.population),
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                borderWidth: 1,
                borderColor: 'rgb(255, 0, 0)',
                fill: false
              }
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });

        let countryNeighborhood = countriesData.sort((a,b) => {
          if (a.neighborhood > b.neighborhood) {
            return -1;
          } else if (a.neighborhood < b.neighborhood) {
            return 1;
          }          
          return 0;
        }).slice(0, 10);

        this.chartNeighborhood = new Chart('canvas-neighborhood', {
          type: 'bar',
          data: {
            labels: countryNeighborhood.map(x => x.name),
            datasets: [
              { 
                data: countryNeighborhood.map(x => x.neighborhood),
                backgroundColor: ['rgba(255, 0, 0, 0.2)', 'rgba(255, 198, 179, 0.6)', 'rgba(255, 217, 179, 0.6)', 'rgba(255, 236, 179, 0.6)', 'rgba(255, 255, 179, 0.6)', 'rgba(236, 255, 179, 0.6)', 'rgba(217, 255, 179, 0.6)', 'rgba(198, 255, 179, 0.6)', 'rgba(179, 255, 179, 0.6)', 'rgba(179, 255, 255, 0.6)' ],
                borderWidth: 1,
                borderColor: ['rgb(255, 0, 0)', 'rgb(255, 64, 0)', 'rgb(255, 128, 0)', 'rgb(255, 191, 0)', 'rgb(255, 255, 0)', 'rgb(191, 255, 0)', 'rgb(128, 255, 0)', 'rgb(64, 255, 0)', 'rgb(0, 255, 0)', 'rgb(0, 255, 255)' ],
                fill: false
              }
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true,
              }],
              yAxes: [{
                display: true,
                ticks: {
                  beginAtZero: true
              }
              }]
            }
          }
        });


      });
  }
}