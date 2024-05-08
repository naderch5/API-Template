import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRequestShowComponent } from './project-request-show.component';

describe('ProjectRequestShowComponent', () => {
  let component: ProjectRequestShowComponent;
  let fixture: ComponentFixture<ProjectRequestShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectRequestShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRequestShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
