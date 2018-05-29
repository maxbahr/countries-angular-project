import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CountriesSearchComponent } from './countries-search/countries-search.component';
import { CountryFlagsComponent } from './country-flag/country-flag.component';
import { CountriesGridComponent } from './countries-grid/countries-grid.component';
import { CountryCarouselComponent } from './country-carousel/country-carousel.component';
import { CountriesStatisticsComponent } from './countries-statistics/countries-statistics.component';
import { CountryMapComponent } from './country-map/country-map.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { CountriesRegionComponent } from './countries-region/countries-region.component';
import { CountrySelectComponent } from './country-select/country-select.component';
import { GameFlagComponent } from './game-flag/game-flag.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavComponent } from './nav/nav.component';
import { CountriesService } from './countries.service';
import { MaterialAppModule } from './material.module';
import { CountriesWorldMapComponent } from './countries-world-map/countries-world-map.component';


const routes: Routes = [
  { path: '', component: CountriesSearchComponent },
  { path: 'flags', component: CountryFlagsComponent },
  { path: 'grid', component: CountriesGridComponent },
  { path: 'statistics', component: CountriesStatisticsComponent },
  { path: 'country/:code', component: CountryDetailsComponent },
  { path: 'region/:region', component: CountriesRegionComponent },
  { path: 'game', component: GameFlagComponent },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    CountryFlagsComponent,
    CountryDetailsComponent,
    GameFlagComponent,
    CountryMapComponent,
    CountriesWorldMapComponent,
    CountriesSearchComponent,
    CountriesGridComponent,
    CountriesStatisticsComponent,
    CountryCarouselComponent,
    CountriesRegionComponent,
    CountrySelectComponent,
    PageNotFoundComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MaterialAppModule,
    NgbModule.forRoot()
  ],
  providers: [CountriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
