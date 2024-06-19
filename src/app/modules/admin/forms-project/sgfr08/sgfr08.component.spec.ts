import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SGFR08Component } from './sgfr08.component';

describe('SGFR08Component', () => {
  let component: SGFR08Component;
  let fixture: ComponentFixture<SGFR08Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SGFR08Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SGFR08Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
