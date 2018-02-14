import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDictionaryComponent } from './admin-dictionary.component';

describe('AdminDictionaryComponent', () => {
  let component: AdminDictionaryComponent;
  let fixture: ComponentFixture<AdminDictionaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDictionaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
