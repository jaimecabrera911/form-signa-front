import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sgfr56Component } from './sgfr56.component';

describe('Sgfr56Component', () => {
  let component: Sgfr56Component;
  let fixture: ComponentFixture<Sgfr56Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sgfr56Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sgfr56Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
