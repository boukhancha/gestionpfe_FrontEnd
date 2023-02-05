import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSupervisorComponent } from './register-supervisor.component';

describe('RegisterSupervisorComponent', () => {
  let component: RegisterSupervisorComponent;
  let fixture: ComponentFixture<RegisterSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSupervisorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
