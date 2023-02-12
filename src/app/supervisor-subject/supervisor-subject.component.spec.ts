import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorSubjectComponent } from './supervisor-subject.component';

describe('SupervisorSubjectComponent', () => {
  let component: SupervisorSubjectComponent;
  let fixture: ComponentFixture<SupervisorSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
