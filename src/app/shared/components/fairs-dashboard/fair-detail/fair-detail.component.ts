import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Ifair } from 'src/app/shared/models/fairs';
import { FairService } from 'src/app/shared/services/fair.service';

@Component({
  selector: 'app-fair-detail',
  templateUrl: './fair-detail.component.html',
  styleUrls: ['./fair-detail.component.scss']
})
export class FairDetailComponent implements OnInit {
 fairId!: string;
  fairObj!: Ifair;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _fairService: FairService,
  ) {}

  ngOnInit(): void {
    this.getFairObj()
  }

  getFairObj() {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.fairId = params['fairId'];
      if(this.fairId){
          this._fairService.fetchFairById(this.fairId).subscribe({
        next: (data) => {
          this.fairObj = data;
        },
        error: (err) => {
          console.log(err);
        },
      });
      }  
    });
  }


}
