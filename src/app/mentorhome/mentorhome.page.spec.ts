import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorhomePage } from './mentorhome.page';

describe('MentorhomePage', () => {
  let component: MentorhomePage;
  let fixture: ComponentFixture<MentorhomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorhomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorhomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
