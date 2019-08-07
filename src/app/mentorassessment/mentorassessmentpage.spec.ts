import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorinfotabsPage } from './mentorinfotabs.page';

describe('MentorinfotabsPage', () => {
  let component: MentorinfotabsPage;
  let fixture: ComponentFixture<MentorinfotabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorinfotabsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorinfotabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
