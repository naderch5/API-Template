import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditRShowComponent } from './credit-r-show.component';

describe('CreditRShowComponent', () => {
  let component: CreditRShowComponent;
  let fixture: ComponentFixture<CreditRShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditRShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditRShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
