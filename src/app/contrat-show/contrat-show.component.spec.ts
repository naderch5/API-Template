import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratShowComponent } from './contrat-show.component';

describe('ContratShowComponent', () => {
  let component: ContratShowComponent;
  let fixture: ComponentFixture<ContratShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
