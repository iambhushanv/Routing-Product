import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FairDetailComponent } from './fair-detail.component';

describe('FairDetailComponent', () => {
  let component: FairDetailComponent;
  let fixture: ComponentFixture<FairDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FairDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FairDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
