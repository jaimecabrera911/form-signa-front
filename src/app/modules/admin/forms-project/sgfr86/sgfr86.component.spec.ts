import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sgfr86Component } from './sgfr86.component';

describe('Sgfr86Component', () => {
  let component: Sgfr86Component;
  let fixture: ComponentFixture<Sgfr86Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sgfr86Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sgfr86Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
