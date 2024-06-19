import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sgfr32Component } from './sgfr32.component';

describe('Sgfr32Component', () => {
  let component: Sgfr32Component;
  let fixture: ComponentFixture<Sgfr32Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sgfr32Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sgfr32Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
