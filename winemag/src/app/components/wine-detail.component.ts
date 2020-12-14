import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WineService } from '../wine.service';

@Component({
  selector: 'app-wine-detail',
  templateUrl: './wine-detail.component.html',
  styleUrls: ['./wine-detail.component.css']
})
export class WineDetailComponent implements OnInit {

  id = '';
  wineData = [];
  country = ''

  constructor(private wineSvc: WineService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id']
    this.wineSvc.getWineDetail(this.id)
      .then(results => {
        console.log('wine detail', results)
        this.wineData = results;
        this.country = results[0].country;
      })
      .catch(e => console.log('error', e))
  }

}
