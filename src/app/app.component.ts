import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { SpinnerService } from './shared/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Routing-Product';
  isLoading: boolean = false;

  private _spinnerService = inject(SpinnerService);
  private _cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this._spinnerService.isLoadingObs$.subscribe(res => {
      this.isLoading = res;
      this._cdr.detectChanges();
    });
  }
}