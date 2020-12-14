import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { CountryListComponent } from './components/country-list.component';
import { WineService } from './wine.service';
import { CountryDetailComponent } from './components/country-detail.component';
import { WineDetailComponent } from './components/wine-detail.component'

const routes: Routes = [
  {path: '', component: CountryListComponent},
  {path: 'countryDetail/:country', component: CountryDetailComponent},
  {path: 'wineDetail/:id', component: WineDetailComponent},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    CountryDetailComponent,
    WineDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [WineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
