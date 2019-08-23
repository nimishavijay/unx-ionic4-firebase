import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformmenteePage } from './informmentee.page';

describe('InformmenteePage', () => {
  let component: InformmenteePage;
  let fixture: ComponentFixture<InformmenteePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformmenteePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformmenteePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
