import { Component, OnInit } from '@angular/core';
import { Ifair } from '../../models/fairs';
import { FairService } from '../../services/fair.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fairs-dashboard',
  templateUrl: './fairs-dashboard.component.html',
  styleUrls: ['./fairs-dashboard.component.scss']
})
export class FairsDashboardComponent implements OnInit {
  getAllFairs!: Ifair[];

  constructor(private _fairsService: FairService,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.getAllFairsFormService();
  }

  getAllFairsFormService() {
    this._fairsService.fetchFairs().subscribe({
      next: (data) => {
        this.getAllFairs = data;
        if(this.getAllFairs.length > 0){
          this._router.navigate(['fairs', this.getAllFairs[0].fairId])
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
