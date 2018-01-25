import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPracticeComponent } from './admin-practice.component';

describe('AdminPracticeComponent', () => {
  let component: AdminPracticeComponent;
  let fixture: ComponentFixture<AdminPracticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPracticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
