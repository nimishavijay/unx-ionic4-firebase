import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorinfoPage } from './mentorinfo.page';

describe('MentorinfoPage', () => {
  let component: MentorinfoPage;
  let fixture: ComponentFixture<MentorinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
