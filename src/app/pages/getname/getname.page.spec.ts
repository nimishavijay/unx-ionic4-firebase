import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetnamePage } from './getname.page';

describe('GetnamePage', () => {
  let component: GetnamePage;
  let fixture: ComponentFixture<GetnamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetnamePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetnamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
