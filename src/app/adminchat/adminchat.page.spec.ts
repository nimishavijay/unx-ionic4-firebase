import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminchatPage } from './adminchat.page';

describe('AdminchatPage', () => {
  let component: AdminchatPage;
  let fixture: ComponentFixture<AdminchatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminchatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminchatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
