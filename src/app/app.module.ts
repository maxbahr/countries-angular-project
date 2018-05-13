import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';

import { RouterModule, Routes} from '@angular/router'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryMapComponent } from './country-map/country-map.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavComponent } from './nav/nav.component';
import { CountriesService } from './countries.service';


const routes: Routes  = [
  {path: '', component: CountryListComponent},
  {path: 'country/:code', component: CountryDetailsComponent},
  {path: 'contact', component: ContactComponent},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,        
    CountryListComponent,
    CountryDetailsComponent,
    ContactComponent,
    CountryMapComponent,
    PageNotFoundComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBwkUM3EcnCz9GAGMNpz95HHG2OyCNC46o'
    }),
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [ CountriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
