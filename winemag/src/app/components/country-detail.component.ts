import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WineService } from '../wine.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {

  country = '';
  detail = [];
  offset = 0;

  constructor(private wineSvc: WineService, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.country = this.activatedRoute.snapshot.params['country']
    this.wineSvc.getCountryDetail(this.country, this.offset)
      .then(results => {
        console.log('detail', results)
        this.detail = results;
      })
      .catch(e => console.error('error', e))
  }

  previousPage() {
    this.offset -= 20;
    this.wineSvc.getCountryDetail(this.country, this.offset)
      .then(results => {
        console.log('detail', results)
        this.detail = results;
      })
      .catch(e => console.error('error', e))
  }

  nextPage() {
    this.offset += 20;
    this.wineSvc.getCountryDetail(this.country, this.offset)
      .then(results => {
        console.log('detail', results)
        this.detail = results;
      })
      .catch(e => console.error('error', e))
  }

}
