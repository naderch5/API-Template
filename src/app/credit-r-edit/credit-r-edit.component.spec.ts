import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditREditComponent } from './credit-r-edit.component';

describe('CreditREditComponent', () => {
  let component: CreditREditComponent;
  let fixture: ComponentFixture<CreditREditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditREditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditREditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
