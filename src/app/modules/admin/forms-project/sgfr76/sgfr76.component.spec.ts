import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sgfr76Component } from './sgfr76.component';

describe('Sgfr76Component', () => {
  let component: Sgfr76Component;
  let fixture: ComponentFixture<Sgfr76Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sgfr76Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sgfr76Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
