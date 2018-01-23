import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChatbotComponent } from './admin-chatbot.component';

describe('AdminChatbotComponent', () => {
  let component: AdminChatbotComponent;
  let fixture: ComponentFixture<AdminChatbotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChatbotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
