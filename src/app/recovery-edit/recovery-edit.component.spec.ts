import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryEditComponent } from './recovery-edit.component';

describe('RecoveryEditComponent', () => {
  let component: RecoveryEditComponent;
  let fixture: ComponentFixture<RecoveryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoveryEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
