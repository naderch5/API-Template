import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditShowComponent } from './credit-show.component';

describe('CreditShowComponent', () => {
  let component: CreditShowComponent;
  let fixture: ComponentFixture<CreditShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
