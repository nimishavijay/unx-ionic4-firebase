import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintabsPage } from './admintabs.page';

describe('AdmintabsPage', () => {
  let component: AdmintabsPage;
  let fixture: ComponentFixture<AdmintabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmintabsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmintabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
