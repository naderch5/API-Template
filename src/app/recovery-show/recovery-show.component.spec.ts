import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryShowComponent } from './recovery-show.component';

describe('RecoveryShowComponent', () => {
  let component: RecoveryShowComponent;
  let fixture: ComponentFixture<RecoveryShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoveryShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
